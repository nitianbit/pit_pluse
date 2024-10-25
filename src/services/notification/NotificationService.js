import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

class NotificationService {
    // Method to display an immediate notification
    static async displayNotification(title, body) {
        try {
            // Create a channel for Android (required)
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            // Display a notification
            await notifee.displayNotification({
                title: title,
                body: body,
                android: {
                    channelId,
                    smallIcon: 'ic_launcher', // Ensure you have this icon in the drawable folder
                },
            });
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
            });

            // Create a time-based trigger
            const trigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: triggerTime*1000, // Trigger time (in milliseconds)
            };

            // Schedule the notification
            await notifee.createTriggerNotification(
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

}

export default NotificationService;
export const notificationService=new NotificationService();
