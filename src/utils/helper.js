import { MessageType, showMessage } from "react-native-flash-message"


export const displayMessage = ({ type, message, description = "" }) => {
    showMessage({
        message: message ?? 'Something went wrong. Please try again',
        description,
        type//danger,info,default,none,success,warning,
    })
}