import useTriggerNotifications from "@/hooks/use-send-Notification";
import useNotifications from "@/hooks/useNotification";
import * as Notifications from "expo-notifications";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

interface Props {
  navigation: any;
}

const WebViewScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const webPageLoadNotificationTrigger = useRef(false);
  useNotifications();

  const sendNotification = useTriggerNotifications();

  /**
   * Sends a notification with the title "WebView Loaded" and body "Hey, Your page is loaded successfully." after 1 second with type TIME_INTERVAL.
   */
  const sendNotificationWebViewLoad = async () => {
    await sendNotification({
      title: "WebView Loaded",
      body: "Hey, Your page is loaded successfully.",
      seconds: 1,
    });
  };

  /**
   * Sends a notification with the title "Reminder Scheduled" and body "Alert scheduled & will notify shortly."
   * after 2 seconds with type TIME_INTERVAL.
   */
  const sendNotification1 = async () => {
    await sendNotification({
      title: "Reminder Scheduled",
      body: "Alert scheduled & will notify shortly.",
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    });
  };

  /**
   * Sends a notification with the title "Action Completed" and body "Task finished successfully!"
   * after 5 seconds with type TIME_INTERVAL.
   */
  const sendNotification2 = async () => {
    await sendNotification({
      title: "Action Completed",
      body: "Task finished successfully!",
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    });
  };

  const onLoadEnd = () => {
    setIsLoading(false);
    if (!webPageLoadNotificationTrigger.current) {
      sendNotificationWebViewLoad();
      webPageLoadNotificationTrigger.current = true;
    }
  };

  const inset = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://expo.dev" }}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={onLoadEnd}
      />

      <View style={[styles.buttons, { bottom: inset.bottom + 20 }]}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={sendNotification1}>
            <Text style={styles.btnText}>{"Notify 1"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn3} onPress={sendNotification2}>
            <Text style={styles.btnText}>{"Notify 2"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btn2}
          onPress={() => {
            navigation.navigate("VideoPlayerScreen");
          }}
        >
          <Text style={styles.btnText}>Go To Video Player</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  buttons: {
    position: "absolute",
    alignSelf: "center",
    width: 360,
    gap: 12,
  },
  btn: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 160,
  },
  btn3: {
    backgroundColor: "#197638",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 160,
  },
  btn2: {
    backgroundColor: "#A41976",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 340,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  webView: {
    flex: 1,
    marginTop: 0,
  },
});
