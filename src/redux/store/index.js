import { configureStore } from "@reduxjs/toolkit";
import activeRaceSlice from "../slices/activeRaceSlice";



const store = configureStore({
    reducer: {
        activeRace: activeRaceSlice
    },
});

export default store;
