import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function useNotifications() {
  useEffect(() => {
    async function setup() {
      // ask permission
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") return alert("Notification Permission Denied!");

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [200, 200, 200],
          enableLights: true,
          enableVibrate: true,
          bypassDnd: true,
          sound: "default",
          lockscreenVisibility:
            Notifications.AndroidNotificationVisibility.PUBLIC,
        });
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowAlert: true,
          shouldShowList: false,
          priority: Notifications.AndroidNotificationPriority.MAX,
        }),
      });

      await Notifications.setNotificationCategoryAsync("custom", [
        {
          identifier: "open",
          buttonTitle: "OPEN",
          options: { opensAppToForeground: true },
        },
      ]);
    }

    setup();
  }, []);
}
