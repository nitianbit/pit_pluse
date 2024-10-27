import { makeAutoObservable, runInAction } from "mobx";
import { DEFAULT_STATS_DATA, DEFAULT_RACE_DATA, RACE_STATUS, FLAG_TYPE } from "../utils/constants";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import moment, { duration } from "moment";
import scheduleService from "../services/schedule";
import driverStore from "./DriverStore";
import fuelStore from "./FuelStore";
import { getDriverNameUsingIndex, getEvent } from "../utils/helper";
import { Alert } from "react-native";

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}



class RaceStore {
    data = DEFAULT_RACE_DATA;
    raceStats = DEFAULT_STATS_DATA.race; // race Data
    schedule = {};//store the schedule
    logs = [];//populate from localstorage
    timerInterval = null;
    flags = DEFAULT_STATS_DATA.flag;


    constructor() {
        try {
            makeAutoObservable(this);
            console.log("inside constructor...",this.loadRaceData)
            this.loadRaceData();  // Load the race data from localStorage if it exists
            this.loadLogsData();
    
            // Create a debounced version of createSchedule
            this.debouncedCreateSchedule = debounce(this.createSchedule.bind(this), 500);
            
        } catch (error) {
            console.log(error)
        }

    }

    processInitialData = () => {
        //create schedule
        this.debouncedCreateSchedule();

        // // Start stint when race starts
        // stintStore.startStint(); // Start the stint when race starts

        // Start fuel timer when race starts
        fuelStore.startFuelTimer();

        //initialize drivers
        driverStore.initlizeDriverStats(this.data.drivers);
        //TODO set totalDrivingDuration for each driver
        //set currentDriver and startDriverTimer
        const { currentDriver } = scheduleService.getAvgStintDurationAndCurrentDriver();
        console.log("currentDriver", currentDriver);
        driverStore.changeCurrentDriver(currentDriver);
    }

    // Start the race timer
    startRace = (manually = false) => {
        //manually will be true when we start manually from UI and false when start from localstorage ie when app killed or in backgorund and in that case use the startTime else update from the data

        //cancel previous timer if any
        if (this.timerInterval) {
            this.stopRace();
        }

        this.processInitialData();


        let currentTime = moment().unix();
        runInAction(() => {
            const raceStartTime = (manually || !this.raceStats.startTime) ? currentTime : this.raceStats.startTime;

            // this.raceStats.startTime = this.raceStats.startTime || currentTime; // Set if not already set
            this.raceStats.startTime = raceStartTime; // Set if not already set
            this.raceStats.duration = (this.data.duration ?? 0) * 60 * 60;//in seconds
        })

        // Start the interval to update durationCovered based on elapsed time since startTime
        this.timerInterval = setInterval(() => {
            currentTime = moment().unix();
            const elapsedTime = currentTime - this.raceStats.startTime;

            runInAction(() => {
                this.raceStats.durationCovered = elapsedTime;
            })

            // Save the updated stats in localStorage
            this.saveRaceData();
        }, 1000); // update every second

        runInAction(() => {
            this.raceStats.status = RACE_STATUS.STARTED;
            console.log("starting race....", this.raceStats.status)
        })

    }


    // Save race data to localStorage in the format you specified
    saveRaceData = () => {
        const raceDataToSave = {
            // in same format as the DEFAULT_RACE_DATA.race
            race: {
                startTime: this.raceStats.startTime,
                durationCovered: this.raceStats.durationCovered,
                duration: this.data.duration,//this will be in hours
            }
        };
        storageService.saveKey(STORAGE_KEYS.RACE_DURATION_STATS,raceDataToSave);
        this.saveLogsData();
        this.saveRaceSetup();
    }

    saveRaceSetup=async()=>{
      try {
        storageService.saveKey(STORAGE_KEYS.RACE,{
            data:this.data
        })
      } catch (error) {
        
      }
    }
    loadRaceSetupAndCreateSchedule=async()=>{
      try {
       const savedData = await storageService.get(STORAGE_KEYS.RACE);
       if(savedData && savedData.data){
          runInAction(()=>{
            this.data=savedData.data;
          });
          //create schedule
          this.createSchedule();
       }
      } catch (error) {
        
      }
    }


    // Load race data from localStorage if it exists
    loadRaceData = async () => {
        try {
            const savedData = await storageService.get(STORAGE_KEYS.RACE_DURATION_STATS);
            if (savedData && savedData.race) {
                const currentTime = moment().unix();
                const elapsedSinceLastUpdate = currentTime - savedData.race.startTime;

                // Restore race state
                runInAction(() => {
                    this.raceStats.startTime = savedData.race.startTime;
                    this.raceStats.durationCovered = savedData.race.durationCovered + elapsedSinceLastUpdate;
                    this.raceStats.duration = savedData.race.duration;
                })
                console.log({savedData})

                // Optionally start the timer again to continue the race it trip started
                if (this.raceStats.status === RACE_STATUS.STARTED) {
                    this.startRace();
                    this.debouncedCreateSchedule();//create schedule
                }
            }
        } catch (error) {

        }

    }
    // Stop the timer when the race ends or app closes or manually stopped
    stopRace = () => {
        clearInterval(this.timerInterval);
        runInAction(() => {
            this.timerInterval = null;
        })
        this.saveRaceData(); // Save one last time before stopping
    }

    resetData = () => {
        runInAction(() => {
            this.data = DEFAULT_RACE_DATA;
            this.raceStats = DEFAULT_STATS_DATA.race;
            this.timerInterval = null;
            this.logs = [];
            this.schedule = {};
        })
        //TODO clear schedule also
    }

    updateDrivers = (add = true) => {
        if (!this.data.drivers.length && !add) return
        //TODO do calulation here
        //save time in hh:mm format or sime time format and will show in hh:mm format
        runInAction(() => {
            if (add) {
                this.data.drivers.push({ name: '', time: null })
            } else {
                this.data.drivers.pop()
            }
        })
        this.debouncedCreateSchedule();
    }

    updateStops = (add = true) => {
        if (!this.data.stops.length && !add) return
        //TODO do calulation here
        runInAction(() => {
            if (add) {
                this.data.stops.push({ name: '', time: null, start: new Date() })
            } else {
                this.data.stops.pop()
            }
        })
        this.debouncedCreateSchedule();
    }

    //TODO add debounce here
    updateData = (key, value) => {
        runInAction(() => {
            this.data[key] = value;
        })
        this.debouncedCreateSchedule();
    }

    updateStopsData = (index, key, value) => {
        runInAction(() => {
            this.data.stops[index][key] = value;
        })
        if (key !== 'name') { //if changing name then do not call it
            this.debouncedCreateSchedule();
        }
    }

    updateDriversData = (index, key, value) => {
        runInAction(() => {
            this.data.drivers[index][key] = value;
        })
        if (key !== 'name') {
            this.debouncedCreateSchedule();
        }
    }

    createSchedule = () => {
        const { drivers, stops, startTime, duration } = this.data
        if (drivers.length && startTime && duration) {
            //TODO use stops

            const scheduleData = scheduleService.getStats(this.data);
            runInAction(() => {
                this.schedule = scheduleData;
            })
            return this.schedule;
            //TODO save in local storage the original data and calculate this data from there
        }
    }

    // Load logs data from localStorage if it exists
    loadLogsData = async () => {
        try {
            const savedData = await storageService.get(STORAGE_KEYS.RACE_LOGS);
            if (savedData && savedData.logs) {
                // Restore race state
                runInAction(() => {
                    this.logs = savedData.logs;
                })
            }
        } catch (error) {

        }
    }

    saveLogsData = async () => {
        try {
            const jsonValue = { logs: this.logs };
            await storageService.saveKey(STORAGE_KEYS.RACE_LOGS, jsonValue);
        } catch (error) {

        }
    }

    generateLogs = (event = null) => {
        if (this.raceStats.status !== RACE_STATUS.STARTED) {
            return Alert.alert("Race not started yet.");
        }
        const currentDriver = driverStore.driverStats.currentDriver;

        const { duration, durationCovered } = this.raceStats;
        const timeLeftForRace = duration - durationCovered;

        const { durationCovered: fuelDurationCovered, fuelDuration } = fuelStore.fuelStats;
        const timeLeftForFuel = fuelDuration - fuelDurationCovered;

        this.logs.push({
            currentDriver: getDriverNameUsingIndex(currentDriver, this.data.drivers),
            timeLeftForRace,
            timeLeftForFuel,
            event: event || getEvent(this.flags) || 'N/A',
            currentTime: moment().unix()
        });

        if (event === FLAG_TYPE.RED_FLAG) {
            this.flags.redFlag = true;
        }
        if(event===FLAG_TYPE.GREEN_FLAG){
            this.flags.redFlag = false;
        }
    }

}

const raceStore = new RaceStore();
export default raceStore