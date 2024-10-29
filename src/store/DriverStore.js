import { makeAutoObservable, runInAction } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import { DEFAULT_STATS_DATA } from "../utils/constants";
import scheduleService from "../services/schedule";
import moment from "moment";
import raceStore from "./RaceStore";

class DriverStore {
    driverStats = DEFAULT_STATS_DATA.driver; // Example: { driverId: { totalDrivingDuration: seconds, durationCovered: seconds } }
    timerInterval = null;

    constructor() {
        makeAutoObservable(this);
    }
    initlizeDriverStats(drivers) {

        //TODO when race starts loop through drivers and assign in the form of { driverId: { totalDrivingDuration: seconds, durationCovered: seconds } }

        for (let i = 0; i < drivers.length; i++) {
            runInAction(() => {
                this.driverStats.stats[i] = {
                    totalDrivingDuration: raceStore.data.duration * 60 * 60,
                    durationCovered: this.driverStats.stats[i]?.durationCovered ?? 0
                };
            })
        }
        this.loadDriverData(); // Load driver data from localStorage if it exists
    }

    //this function needs to call every second from the timer
    updateDriverStats = (driverId, durationCovered) => {
        runInAction(() => {
            console.log("initial", this.driverStats.stats, driverId)
            if ([null, undefined].includes(driverId)) {
                const currentDriver = this.fetchCurrentDriver();
                if (currentDriver === null) {
                    return;
                }
            }
            if (!this.driverStats.stats[driverId]) {
                this.driverStats.stats[driverId] = { totalDrivingDuration: 0, durationCovered: 0 };
            }
            this.driverStats.stats[driverId].durationCovered = durationCovered;
            this.saveDriverData(); // Save changes to localStorage
        })
    }

    saveDriverData = () => {
        const dataToSave = {
            driver: this.driverStats
        }
        storageService.saveKey(STORAGE_KEYS.DRIVER_STATS, dataToSave);
    }

    loadDriverData = async () => {
        try {
            const savedData = await storageService.get(STORAGE_KEYS.DRIVER_STATS);
            if (savedData && savedData.driver) {
                runInAction(() => {
                    // Restore driver stats from saved data
                    this.driverStats = savedData.driver;
                });

                if (![null, undefined].includes(this.driverStats.currentDriver)) {
                    this.startDriverStatsInterval();
                }
            } else {
                const currentDriver = this.fetchCurrentDriver();
                if (currentDriver !== null) {
                    this.startDriverStatsInterval();
                }
            }
        } catch (error) {

        }
    }

    // Start the driver stats update interval
    startDriverStatsInterval = () => {
        if (this.timerInterval) {
            this.stopDriverStatsInterval();
        }

        if (!this.driverStats.currentDriver) {
            const { currentDriver } = scheduleService.getAvgStintDurationAndCurrentDriver();
            this.driverStats.currentDriver = currentDriver;
        }

        this.timerInterval = setInterval(() => {
            const currentTime = moment().unix();

            runInAction(() => {
                if (!this.driverStats.startTime) {
                    this.driverStats.startTime = currentTime;
                }
                const elapsedTime = currentTime - this.driverStats.startTime;
                this.updateDriverStats(this.driverStats.currentDriver, elapsedTime, elapsedTime);
            });

            this.saveDriverData(); // Save the updated driver data in localStorage
        }, 1000); // Update every second
    }

    stopDriverStatsInterval = () => {
        clearInterval(this.timerInterval);
        this.saveDriverData(); // Save one last time before stopping
        runInAction(() => {
            this.timerInterval = null;
        })
    }

    changeCurrentDriver = (driverId) => {
        //fetch the new driver's already coveredDuratoin and duration he need to covered from localstorage
        if (this.timerInterval) {
            this.stopDriverStatsInterval();
        }
        runInAction(() => {
            this.driverStats.currentDriver = driverId;
            this.driverStats.startTime = moment().unix();
        })
        this.startDriverStatsInterval();
    }

    resetData = () => {
        runInAction(() => {
            this.driverStats = DEFAULT_STATS_DATA.driver;
        });
        this.stopDriverStatsInterval();
    }

    fetchCurrentDriver = () => {
        const { currentDriver } = scheduleService.getAvgStintDurationAndCurrentDriver();
        if (![null, undefined].includes(currentDriver)) {
            return currentDriver;
        }
        return null;
    }


}

const driverStore = new DriverStore();
export default driverStore;
