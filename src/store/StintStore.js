import { makeAutoObservable, runInAction } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import moment from "moment";
import { RACE_STATUS } from "../utils/constants";
import raceStore from "./RaceStore";
import scheduleService from "../services/schedule";

class StintStore {
    currentStintDuration = 0;
    durationCovered = 0;
    currentDriver = null;
    timerInterval = null;
    startTime = null;

    constructor() {
        makeAutoObservable(this);
        this.loadStintData(); // Load stint data from localStorage if it exists
    }

    startStint() {
        if (this.timerInterval) {
            this.stopStint();
        }
        
        //update
        const { avgStintDuration, currentDriver } = scheduleService.getAvgStintDurationAndCurrentDriver();
          if(![null,undefined].includes(currentDriver)){
             runInAction(() => {
                 this.currentDriver = currentDriver;
                 this.currentStintDuration = avgStintDuration; //it will be fuelDuration
             })
         }
         
          if(![null,undefined].includes(currentDriver)){
             runInAction(() => {
                 this.currentDriver = currentDriver;
                 this.currentStintDuration = avgStintDuration; //it will be fuelDuration
             })
         }
        

        const currentTime = moment().unix();
        
        //if no startTime then set startTime else in case of reload or app open will use the last saved startTime (already done in loadStintData)
        if(!this.startTime) {
            runInAction(() => {
                this.startTime = currentTime;
            })
        }
        this.timerInterval = setInterval(() => {
            const elapsedTime = moment().unix() - this.startTime;
            runInAction(() => {
                this.durationCovered = elapsedTime;
            })

            this.saveStintData();
        }, 1000); // Update every second
    }

    saveStintData() {
        const stintDataToSave = {
            startTime: this.startTime,
            currentStintDuration: this.currentStintDuration,
            durationCovered: this.durationCovered,
            currentDriver: this.currentDriver,
        };
        // storageService.saveKey(STORAGE_KEYS.STINT_STATS, JSON.stringify(stintDataToSave));
    }

     loadStintData=async()=> {
        try {
            const savedData = JSON.parse(await storageService.get(STORAGE_KEYS.STINT_DATA));
            if (savedData) {
                const currentTime = moment().unix();
                const elapsedSinceLastUpdate = currentTime - savedData.startTime;//stint startTime
               
                //set State data from local storage
                runInAction(() => {
                    this.currentStintDuration = savedData.currentStintDuration;
                    this.durationCovered = savedData.durationCovered + elapsedSinceLastUpdate;
                    this.currentDriver = savedData.currentDriver;
                    this.startTime = savedData.startTime;
                })


                if(this.stats.race.status===RACE_STATUS.STARTED){
                    this.startStint(); // Restart the stint timer
                }
            }
        } catch (error) {

        }
    }

    stopStint=()=> {
        clearInterval(this.timerInterval);
        runInAction(() => {
            this.timerInterval = null;
        })
        this.saveStintData(); // Save one last time before stopping
    }

    //this method is only to store currentDriver in state and localstorage
    updateCurrentDriver=(driverId)=>{
        runInAction(() => {
            this.currentDriver = driverId;
        })
        this.saveStintData(); 
      //TODO save in localstorage
    }

    resetData = () => {
        runInAction(() => {
            this.currentStintDuration = 0;
            this.durationCovered = 0;
            this.currentDriver = null;
            this.timerInterval = null;
            this.startTime = null;
        })
    }
}

const stintStore = new StintStore();
export default stintStore;
