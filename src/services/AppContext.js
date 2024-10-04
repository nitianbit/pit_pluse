// MyContext.js
import moment from 'moment';
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [data, setData] = useState({
        date: new Date(),
        startTime: moment().unix(),
        duration: 0,
        fuelDuration: 0,
        drivers: [],//{name:'',time:null}
        stops: [],//{name:'',time:null}
        // numberOfDrivers: 0,// no use 
        // numberOfServiceStops: 0, //no use
    })

    const updateDrivers = (add = true) => {
        if (!data.drivers.length && !add) return
        //TODO do calulation here
        //save time in hh:mm format or sime time format and will show in hh:mm format
        if (add) {
            setData(prev => ({ ...prev, drivers: [...prev.drivers, { name: '', time: null }] }))
        } else {
            setData(prev => ({ ...prev, drivers: prev.drivers.slice(0, -1) }))
        }
    }
    const updateStops = (add = true) => {
        if (!data.stops.length && !add) return
        //TODO do calulation here
        if (add) {
            setData(prev => ({ ...prev, stops: [...prev.stops, { name: '', time: null }] }))
        } else {
            setData(prev => ({ ...prev, stops: prev.stops.slice(0, -1) }))
        }
    }

    //TODO add debounce here
    const updateData = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }

    const updateStopsData = (index, key, value) => {
        setData(prev => ({ ...prev, stops: prev.stops.map((stop, i) => i === index ? { ...stop, [key]: value } : stop) }))
    }
    const updateDriversData = (index, key, value) => {
        setData(prev => ({ ...prev, drivers: prev.drivers.map((driver, i) => i === index ? { ...driver, [key]: value } : driver) }))
    }



    return (
        <AppContext.Provider
            value={{
                updateData, updateDrivers, updateStops, updateDriversData, updateStopsData, data
            }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = () => {
    return useContext(AppContext);
};
