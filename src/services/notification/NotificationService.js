import notifee, { AndroidImportance, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';

class NotificationService {
    raceNotificationId = null;
    fuelNotificationId = null;
    driverChangeNotificationId = null;

    // Method to display an immediate notification
    static async displayNotification(title, body) {
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
    static async scheduleNotification(title, body, triggerTime) {//passing triggerTime in seconds so change it to milliseconds
        try {
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
            return notificationId
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    }

    // Cancel all scheduled notifications
    static async cancelAllScheduledNotifications() {
        try {
            await notifee.cancelAllNotifications();
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


}

export default NotificationService;
export const notificationService = new NotificationService();
