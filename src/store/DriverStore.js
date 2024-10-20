import { makeAutoObservable } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";

class DriverStore {
    driverStats = {}; // Example: { driverId: { totalDrivingDuration: seconds, durationCovered: seconds } }

    constructor() {
        makeAutoObservable(this);
        this.loadDriverData(); // Load driver data from localStorage if it exists
    }
    initlizeDriverStats() {
      //TODO when race starts loop through drivers and assign in the form of { driverId: { totalDrivingDuration: seconds, durationCovered: seconds } }
       
    }

    updateDriverStats(driverId, totalDrivingDuration, durationCovered) {
        if (!this.driverStats[driverId]) {
            this.driverStats[driverId] = { totalDrivingDuration: 0, durationCovered: 0 };
        }
        this.driverStats[driverId].totalDrivingDuration += totalDrivingDuration;
        this.driverStats[driverId].durationCovered += durationCovered;

        this.saveDriverData(); // Save changes to localStorage
    }

    saveDriverData() {
        storageService.saveKey(STORAGE_KEYS.DRIVER_STATS, JSON.stringify(this.driverStats));
    }

    async loadDriverData() {
        try {
            const savedData = JSON.parse(await storageService.get(STORAGE_KEYS.DRIVER_STATS));
            if (savedData) {
                this.driverStats = savedData; // Restore driver stats from saved data
            }
        } catch (error) {

        }
    }

    // Start the driver stats update interval
    startDriverStatsInterval() {
        if (this.timerInterval) {
            this.stopDriverStatsInterval();
        }

        this.timerInterval = setInterval(() => {
            // Update each driver's stats in the driverStats object
            for (const driverId in this.driverStats) {
                this.driverStats[driverId].durationCovered += 1; // Increment covered duration by 1 second
                // Additional logic to update totalDrivingDuration or other fields can go here
            }

            this.saveDriverData(); // Save the updated driver data in localStorage
        }, 1000); // Update every second
    }

    stopDriverStatsInterval() {
        clearInterval(this.timerInterval);
        this.saveDriverData(); // Save one last time before stopping
    }

    resetData=()=>{
      this.driverStats = {};
    }


}

const driverStore = new DriverStore();
export default driverStore;
