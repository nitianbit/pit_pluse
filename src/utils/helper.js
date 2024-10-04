import moment from "moment";
import { MessageType, showMessage } from "react-native-flash-message"


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
  