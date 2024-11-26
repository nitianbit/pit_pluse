import { makeAutoObservable, runInAction } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import moment from "moment";
import { DEFAULT_STATS_DATA, NOTIFICATION_TYPE, RACE_STATUS } from "../utils/constants";
import raceStore from "./RaceStore";
import NotificationService from "../services/notification/NotificationService";

class FuelStore {
    fuelStats = DEFAULT_STATS_DATA.fuel;
    timerInterval = null;

    constructor() {
        makeAutoObservable(this);
        this.loadFuelData();
    }

    async startFuelTimer() {
        if (this.timerInterval) {
            this.stopFuelTimer();
        }

        //update fuelDuration in local state
        if (raceStore.data.fuelDuration) {
            runInAction(() => {
                this.fuelStats.fuelDuration = raceStore.data.fuelDuration * 60; //as fuelDuration is in minutes
            });
        }
        
        const currentTime = moment().unix();
        
        //if no startTime then set startTime else in case of reload or app open will use the last saved startTime (already done in loadFuelData)
        if (!this.fuelStats?.startTime) {
            runInAction(() => {
                this.fuelStats.startTime = currentTime;
            });
        }

        const isRedFlag = await storageService.get(STORAGE_KEYS.RED_FLAG);
        if (isRedFlag) {
            //update the current stats
            const elapsedTime = moment().unix() - this.fuelStats.startTime;
            this.fuelStats.durationCovered = elapsedTime;
            return;
        }
        
        //schedule notification
        const elapsedTime = moment().unix() - (this.fuelStats.startTime??moment().unix());
        const remainingTime = this.fuelStats.fuelDuration-elapsedTime;
        this.createNotification(remainingTime);


        this.timerInterval = setInterval(() => {
            const elapsedTime = moment().unix() - this.fuelStats.startTime;
            runInAction(() => {
                this.fuelStats.durationCovered = elapsedTime;
                if(elapsedTime>=this.fuelStats.fuelDuration){
                    this.stopFuelTimer();
                }
            });
            this.saveFuelData();
        }, 1000); // Update every second
    }

    saveFuelData() {
        const fuelStatsToSave = {
            fuel: {
                fuelDuration: this.fuelStats.fuelDuration,
                durationCovered: this.fuelStats.durationCovered,
                startTime: this.fuelStats.startTime
            }
        }
        storageService.saveKey(STORAGE_KEYS.FUEL_STATS, fuelStatsToSave);
    }

    loadFuelData = async () => {
        try {
            const savedData = await storageService.get(STORAGE_KEYS.FUEL_STATS);
            if (savedData && savedData.fuel) {
                const currentTime = moment().unix();
                const startTime = savedData.fuel.startTime ? savedData.fuel.startTime : currentTime;

                const elapsedSinceLastUpdate = currentTime - startTime;

                //set State data from local storage
                runInAction(() => {
                    this.fuelStats = {
                        fuelDuration: savedData.fuel.fuelDuration,
                        durationCovered: savedData.fuel.durationCovered + elapsedSinceLastUpdate,
                        startTime
                    }
                })

                if (this.stats.race.status === RACE_STATUS.STARTED) {
                    this.startFuelTimer(); // Restart the   timer
                }
            }
        } catch (error) {

        }
    }


    stopFuelTimer = () => {
        clearInterval(this.timerInterval);
        runInAction(() => {
            this.timerInterval = null;
        });
        this.saveFuelData(); // Save one last time before stopping
    }

    refuel= () => {
        this.stopFuelTimer()
        this.fuelStats.durationCovered = 0;
        this.fuelStats.startTime = moment().unix();
        this.saveFuelData();
        this.startFuelTimer();
    }



    resetData = () => {
        runInAction(() => {
            this.fuelStats = DEFAULT_STATS_DATA.fuel;
            this.timerInterval = null;
        });
    }


    createNotification = (remainingTime) => {
        try {
            //0 mins
            if (remainingTime > 0) {
                NotificationService.scheduleNotification('Fuel Exhausted', 'Fuel Exhausted', moment().unix() + remainingTime);
            }
            //5 mins
            if (remainingTime > 5 * 60) {
                NotificationService.scheduleNotification('5 mins to Fuel Exhaust', '5 mins remaining for Fuel to endExhaust', moment().unix() + (remainingTime - 5 * 60), NOTIFICATION_TYPE.race5Min);
            }
            //10 mins
            if (remainingTime > 10 * 60) {
                NotificationService.scheduleNotification('10 mins to Fuel Exhaust', '10 mins remaining for Fuel to Exhaust', moment().unix() + (remainingTime - 10 * 60), NOTIFICATION_TYPE.race10Min);
            }
            //15 mins
            if (remainingTime > 15 * 60) {
                NotificationService.scheduleNotification('15 mins to Fuel Exhaust', '15 mins remaining for Fuel to Exhaust', moment().unix() + (remainingTime - 15 * 60), NOTIFICATION_TYPE.race15Min);
            }
        } catch (error) {

        }
    }
}

const fuelStore = new FuelStore();
export default fuelStore;
