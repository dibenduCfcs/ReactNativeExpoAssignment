import * as Notifications from "expo-notifications";

interface Props {
  title: string;
  body: string;
  type?: any;
  seconds: number;
}
/**
 * A hook that returns a function to send a notification with the given title, body, type and seconds.
 *
 * @example
 * const sendNotification = useTriggerNotifications();
 * sendNotification({ title: 'Hello', body: 'World', type: 'TIME_INTERVAL', seconds: 5 });
 */
const useTriggerNotifications = () => {
  /**
   * Send a notification with the given title, body, type and seconds.
   * @param {{ title: string, body: string, type: any, seconds: number }} props
   * @returns {Promise<void>}
   */

  const sendNotification = async ({ title, body, type, seconds }: Props) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: { type: type, seconds },
    });
  };

  return sendNotification;
};

export default useTriggerNotifications;
