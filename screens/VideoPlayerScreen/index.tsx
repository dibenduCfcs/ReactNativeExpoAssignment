import useTriggerNotifications from "@/hooks/use-send-Notification";
import * as Notifications from "expo-notifications";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

/**
 * HLS (.m3u8) video stream URL used as the source for the VideoPlayerScreen.
 *
 * @constant
 * @type {string}
 */
const videoSource = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export default function VideoPlayerScreen() {
  const sendNotification = useTriggerNotifications();

  useEffect(() => {
    sendNotification({
      title: "VideoScreen Loaded",
      body: "Video Loaded successfully!",
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: Dimensions.get("window").width,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
