import { makeAutoObservable } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import moment from "moment";

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
        const currentTime = moment().unix();
        this.startTime = currentTime;

        this.timerInterval = setInterval(() => {
            const elapsedTime = moment().unix() - this.startTime;
            this.durationCovered = elapsedTime;

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
        storageService.saveKey(STORAGE_KEYS.STINT_DATA, JSON.stringify(stintDataToSave));
    }

    async loadStintData() {
        try {
            const savedData = JSON.parse(await storageService.get(STORAGE_KEYS.STINT_DATA));
            if (savedData) {
                const currentTime = moment().unix();
                const elapsedSinceLastUpdate = currentTime - savedData.startTime;//stint startTime

                this.currentStintDuration = savedData.currentStintDuration;
                this.durationCovered = savedData.durationCovered + elapsedSinceLastUpdate;
                this.currentDriver = savedData.currentDriver;

                this.startStint(); // Restart the stint timer
            }
        } catch (error) {

        }
    }

    stopStint() {
        clearInterval(this.timerInterval);
        this.saveStintData(); // Save one last time before stopping
    }
    resetData = () => {
        this.currentStintDuration = 0;
        this.durationCovered = 0;
        this.currentDriver = null;
        this.timerInterval = null;
        this.startTime = null;
    }
}

const stintStore = new StintStore();
export default stintStore;
