import notifee, { AndroidImportance, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';
import storageService from '../Storage';

const types=['raceNotificationId','fuelNotificationId','driverChangeNotificationId'];
const notificationKeys = [
    'race15Min', 'race10Min', 'race5Min', 'raceEnd',
    'fuel15Min', 'fuel10Min', 'fuel5Min', 'fuelEnd'
];

class NotificationService {
    raceNotificationId = null;
    fuelNotificationId = null;
    driverChangeNotificationId = null;
    notificationId = {
        race15Min: null,
        race10Min: null,
        race5Min: null,
        raceEnd: null,
        fuel15Min: null,
        fuel10Min: null,
        fuel5Min: null,
        fuelEnd: null
    };

    constructor() {
        // this.notificationId = notificationKeys.reduce((acc, key) => {
        //     acc[key] = null;
        //     return acc;
        // }, {});
    }

    

    // Method to display an immediate notification
    static async displayNotification(title, body,type) {
        try {
            // Create a channel for Android (required)
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            // Display a notification
            const notificationId = await notifee.displayNotification({
                title: title,
                body: body,
                android: {
                    channelId,
                    smallIcon: 'ic_launcher', // Ensure you have this icon in the drawable folder
                },
            });
            return notificationId;
        } catch (error) {
            console.error('Error displaying notification:', error);
        }
    }

    // Method to schedule a notification at a later time
    static async scheduleNotification(title, body, triggerTime,type) {//passing triggerTime in seconds so change it to milliseconds
        try {
             if(!this.notificationId){
                this.notificationId = notificationKeys.reduce((acc, key) => {
                    acc[key] = null;
                    return acc;
                }, {});
            }
            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: AndroidImportance.HIGH,

            });

            // Create a time-based trigger
            const trigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: triggerTime * 1000, // Trigger time (in milliseconds)
            };

            // Schedule the notification
            const notificationId = await notifee.createTriggerNotification(
                {
                    title: title,
                    body: body,
                    android: {
                        channelId,
                        smallIcon: 'ic_launcher', // Replace with your app's icon
                    },
                },
                trigger
            );

            //if previous notification then clear it
            if (type) {
                 this.notificationId[type] = notificationId;

                const prevNotificationId=await this.getNotificationIdFromLocalStorage(type);
                if(prevNotificationId){
                    //delete it from the local storage and cancel it's notification
                    await storageService.removeKey(type);
                    this.cancelNotification(prevNotificationId);
                }

                //save new key
                await this.saveNotificationIdInLocalStorage(type,notificationId);
            }
            

            return notificationId
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    }

    // Cancel all scheduled notifications
    static async cancelAllScheduledNotifications() {
        try {
            await notifee.cancelAllNotifications();

            for(let type of types){
               storageService.removeKey(type);
            }
            
        } catch (error) {
            console.error('Error canceling notifications:', error);
        }
    }

    static async cancelNotification(notificationId) {
        try {
            await notifee.cancelNotification(notificationId);
            console.log(`Notification with ID ${notificationId} cancelled`);
        } catch (error) {
            console.error('Error canceling notification:', error);
        }
    }

    static async requestPermission() {
        try {
            await notifee.requestPermission();
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    }

    // Listener for foreground notification events
    static initializeForegroundListener = () => {
        notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.PRESS) {
                console.log('User pressed the notification (foreground):', detail.notification);
                // Add navigation or other actions here
            } else if (type === EventType.DISMISSED) {
                console.log('User dismissed the notification (foreground):', detail.notification);
            }
        });
    };

    static initializeBackgroundListener = async () => {
        await notifee.onBackgroundEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS) {
                console.log('Notification pressed in the background:', detail.notification);
                // Add logic or navigation here for background events
            }
        });
    };

    static removeAllListeners = () => {
        notifee.removeAllListeners();
        console.log('All notification listeners have been removed');
    };

    static initializeListeners = () => {
        this.initializeForegroundListener();
        this.initializeBackgroundListener();
    };

    static getNotificationIdFromLocalStorage = async (type) => {
        return await storageService.get(type)
    }

    static saveNotificationIdInLocalStorage = async (type, notificationId) => {
        return await storageService.saveKey(type, notificationId);
    }


}

export default NotificationService;
export const notificationService = new NotificationService();
