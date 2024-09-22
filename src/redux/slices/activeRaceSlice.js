import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     
};
export const ActiveRaceReducer = createSlice({
    name: 'address',
    initialState,
    reducers: {
        reset: (state) => {
            
        },
        update: (state, action) => {
            
        },
 
    },
})
export const { reset, update } = ActiveRaceReducer.actions;
export default ActiveRaceReducer.reducer;