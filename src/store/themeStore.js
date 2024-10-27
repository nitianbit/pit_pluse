import { makeAutoObservable, runInAction } from "mobx";
import storageService from "../services/Storage";
import { STORAGE_KEYS } from "../services/Storage/constants";


export const THEME = {
    LIGHT: 'LIGHT',
    DARK: 'DARK'
}

class ThemeStore {
    currentTheme = THEME.DARK

    constructor() {
        makeAutoObservable(this);
        this.loadSavedTheme();
    }

    loadSavedTheme = async () => {
        try {
            const savedTheme = await storageService.get(STORAGE_KEYS.THEME);
            if (savedTheme && savedTheme.theme) {
               runInAction(()=>{
                this.currentTheme = savedTheme.theme;
               })
            }
        } catch (error) {

        }
    }

    toggleTheme = async () => {
        try {
            this.currentTheme = this.currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
            await storageService.saveKey(STORAGE_KEYS.THEME, {theme:this.currentTheme});
        } catch (error) {

        }
    }
}

const themeService = new ThemeStore();
export default themeService;