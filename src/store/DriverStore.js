import { makeAutoObservable, runInAction } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";

class DriverStore {
    driverStats = {}; // Example: { driverId: { totalDrivingDuration: seconds, durationCovered: seconds } }
    timerInterval = null;

    constructor() {
        makeAutoObservable(this);
        this.loadDriverData(); // Load driver data from localStorage if it exists
    }
    initlizeDriverStats(drivers) {
      //TODO when race starts loop through drivers and assign in the form of { driverId: { totalDrivingDuration: seconds, durationCovered: seconds } }
       console.log(drivers);
    }

    //this function needs to call every second from the timer
    updateDriverStats=(driverId, totalDrivingDuration, durationCovered)=> {
        runInAction(() => {
            if (!this.driverStats[driverId]) {
                this.driverStats[driverId] = { totalDrivingDuration: 0, durationCovered: 0 };
            }
            this.driverStats[driverId].totalDrivingDuration += totalDrivingDuration;
            this.driverStats[driverId].durationCovered += durationCovered;
    
            this.saveDriverData(); // Save changes to localStorage
        })
    }

    saveDriverData=()=> {
        // storageService.saveKey(STORAGE_KEYS.DRIVER_STATS, JSON.stringify(this.driverStats));
    }

      loadDriverData=async()=> {
        try {
            const savedData = JSON.parse(await storageService.get(STORAGE_KEYS.DRIVER_STATS));
            if (savedData) {
                runInAction(() => {
                    this.driverStats = savedData; // Restore driver stats from saved data
                })
                this.startDriverStatsInterval();
            }
        } catch (error) {

        }
    }

    // Start the driver stats update interval
    startDriverStatsInterval=() =>{
        if (this.timerInterval) {
            this.stopDriverStatsInterval();
        }

        this.timerInterval = setInterval(() => {
            // Update each driver's stats in the driverStats object
            for (const driverId in this.driverStats) {
                runInAction(() => {
                    this.driverStats[driverId].durationCovered += 1; 
                })
             }

            this.saveDriverData(); // Save the updated driver data in localStorage
        }, 1000); // Update every second
    }

    stopDriverStatsInterval=()=> {
        clearInterval(this.timerInterval);
        runInAction(() => {
            this.timerInterval = null;
        })
        this.saveDriverData(); // Save one last time before stopping
    }

    changeCurrentDriver=(driverId)=> {
        //fetch the new driver's already coveredDuratoin and duration he need to covered from localstorage
        const totalDrivingDuration = this.driverStats[driverId].totalDrivingDuration;
        const durationCovered = this.driverStats[driverId].durationCovered;
        if(this.timerInterval){
            this.stopDriverStatsInterval();
        }
        this.startDriverStatsInterval();
        //TODO start new interval with new driverId
        
    }

    resetData=()=>{
      this.driverStats = {};
    }


}

const driverStore = new DriverStore();
export default driverStore;
