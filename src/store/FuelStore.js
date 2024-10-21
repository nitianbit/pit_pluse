import { makeAutoObservable, runInAction } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import moment from "moment";
import { DEFAULT_STATS_DATA, RACE_STATUS } from "../utils/constants";
import raceStore from "./RaceStore";

class FuelStore {
    fuelStats = DEFAULT_STATS_DATA.fuel;
    timerInterval = null;

    constructor() {
        makeAutoObservable(this);
        this.loadFuelData();
    }

    startFuelTimer() {
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
        if (!this.fuelStats.startTime) {
            runInAction(() => {
                this.fuelStats.startTime = currentTime;
            });
        }

        this.timerInterval = setInterval(() => {
            const elapsedTime = moment().unix() - this.fuelStats.startTime;
            runInAction(() => {
                this.fuelStats.durationCovered = elapsedTime;
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
        // storageService.saveKey(STORAGE_KEYS.FUEL_STATS, JSON.stringify(fuelStatsToSave));
    }

    loadFuelData = async () => {
        try {
            const savedData = JSON.parse(await storageService.get(STORAGE_KEYS.FUEL_STATS));
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



    resetData = () => {
        runInAction(() => {
            this.fuelStats = DEFAULT_STATS_DATA.fuel;
            this.timerInterval = null;
        });
    }
}

const fuelStore = new FuelStore();
export default fuelStore;
