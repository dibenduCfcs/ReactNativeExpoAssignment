import useTriggerNotifications from '@/hooks/use-send-Notification';
import {useVideoPlayer, VideoView} from 'expo-video';
import {useEffect, useRef} from 'react';
import {View} from 'react-native';
import '../../global.css';
import styles from './styles';

/**
 * HLS (.m3u8) video stream URL used as the source for the VideoPlayerScreen.
 *
 * @constant
 * @type {string}
 */
const videoSource = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoPlayerScreen() {
  const isNotificationTrigger = useRef(false);
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const sendNotification = useTriggerNotifications();

  useEffect(() => {
    const sub = player.addListener('statusChange', ({status}) => {
      if (status === 'readyToPlay' && !isNotificationTrigger.current) {
        sendNotification({
          title: 'VideoScreen Loaded',
          body: 'Video Loaded successfully!',
          seconds: 1,
        });
        isNotificationTrigger.current = true;
      }
    });
    return () => sub.remove();
  }, [player, sendNotification]);

  return (
    <View className="flex-1 item-center justify-center">
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
}
