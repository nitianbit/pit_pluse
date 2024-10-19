import moment from "moment";
import { MessageType, showMessage } from "react-native-flash-message"
import { FLAG_TYPE, getFlagTypeString } from "./constants";


export const displayMessage = ({ type, message, description = "" }) => {
    showMessage({
        message: message ?? 'Something went wrong. Please try again',
        description,
        type//danger,info,default,none,success,warning,
    })
}

export const convertMinutesToHoursAndMinutes=(minutes) =>{
    const duration = moment.duration(minutes, 'minutes');
    const hours = Math.floor(duration.asHours());
    const remainingMinutes = duration.minutes();
    return `${hours}h ${remainingMinutes}m`;
  }
  

 export const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = parseInt(totalSeconds % 60);
  
    return `${hours}h ${minutes}m ${seconds}s`;
  }; 

export const getDriverNameUsingIndex=(index,drivers)=>{
    return drivers[index]?.name??`Driver ${index+1}`
}

export const getEvent = (flags = {}) => {
    let event = ""; 

    // Iterate through key-value pairs of the flags object
    for (let [key, value] of Object.entries(flags)) {
         if (value) {  // Check if the flag is true
            event += `${getFlagTypeString(key)}, `;
        }
    }

    // Remove trailing comma and space, if present
    return event.trim().replace(/,$/, '');
};

 