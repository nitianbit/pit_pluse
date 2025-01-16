import { makeAutoObservable, runInAction } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";
import { darkTheme, lightTheme } from "../utils/constants";
import { run } from "jest";


export const THEME = {
    LIGHT: 'LIGHT',
    DARK: 'DARK'
}

class ThemeStore {
    currentTheme = THEME.LIGHT
    themeConfig = lightTheme//use this everywhere

    constructor() {
        makeAutoObservable(this);
        this.loadSavedTheme();
    }

    loadSavedTheme = async () => {
        try {
            const savedTheme = await storageService.get(STORAGE_KEYS.THEME);
            if (savedTheme && savedTheme.theme) {
                runInAction(() => {
                    this.currentTheme = savedTheme.theme;
                    this.themeConfig = savedTheme.theme === THEME.LIGHT ? lightTheme : darkTheme;
                })
            }
        } catch (error) {

        }
    }

    toggleTheme = async () => {
        try {
            runInAction(() => {
                this.currentTheme = this.currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
                this.themeConfig = this.currentTheme === THEME.LIGHT ? lightTheme : darkTheme;
            })
            await storageService.saveKey(STORAGE_KEYS.THEME, { theme: this.currentTheme });
        } catch (error) {

        }
    }
}

const themeService = new ThemeStore();
export default themeService;