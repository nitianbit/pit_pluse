import { makeAutoObservable } from "mobx";
import { DEFAULT_STATS_DATA, DEFAULT_RACE_DATA } from "../utils/constants";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import moment from "moment";


class RaceStore {
    data = DEFAULT_RACE_DATA;
    stats = DEFAULT_STATS_DATA;
    timerInterval = null;


    constructor() {
        makeAutoObservable(this);
        this.loadRaceData();  // Load the race data from localStorage if it exists
    }

    // Start the race timer
    startRace() {
        //cancel previous timer if any
        if (this.timerInterval) {
            this.stopRace();
        }
        const currentTime = moment().unix();
        this.stats.race.startTime = this.stats.race.startTime || currentTime; // Set if not already set

        // Start the interval to update durationCovered based on elapsed time since startTime
        this.timerInterval = setInterval(() => {
            const elapsedTime = currentTime - this.stats.race.startTime;
            this.stats.race.durationCovered = elapsedTime;

            // Save the updated stats in localStorage
            this.saveRaceData();
        }, 1000); // update every second

    }


    // Save race data to localStorage in the format you specified
    saveRaceData() {
        const raceDataToSave = {
            race: {
                startTime: this.stats.race.startTime,
                durationCovered: this.stats.race.durationCovered
            }
        };
        storageService.saveKey(STORAGE_KEYS.RACE_DURATION_STATS, JSON.stringify(raceDataToSave));
    }


    // Load race data from localStorage if it exists
    async loadRaceData() {
        try {
            const savedData = JSON.parse(await storageService.get(STORAGE_KEYS.RACE_DURATION_STATS));
            if (savedData && savedData.race) {
                const currentTime = moment().unix();
                const elapsedSinceLastUpdate = currentTime - savedData.race.startTime;

                // Restore race state
                this.stats.race.startTime = savedData.race.startTime;
                this.stats.race.durationCovered = savedData.race.durationCovered + elapsedSinceLastUpdate;

                // Optionally start the timer again to continue the race
                this.startRace();
            }
        } catch (error) {

        }

    }
    // Stop the timer when the race ends or app closes
    stopRace() {
        clearInterval(this.timerInterval);
        this.saveRaceData(); // Save one last time before stopping
    }

    resetData() {
        this.data = DEFAULT_RACE_DATA;
        this.stats = DEFAULT_STATS_DATA;
        this.timerInterval = null;
    }

}

const raceStore = new RaceStore();
export default raceStore