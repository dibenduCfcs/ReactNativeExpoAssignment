import useTriggerNotifications from '@/hooks/use-send-Notification';
import useNotifications from '@/hooks/useNotification';
import * as Notifications from 'expo-notifications';
import {Button} from 'heroui-native';
import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import WebView from 'react-native-webview';
import '../../global.css';
import styles from './styles';

interface Props {
  navigation: any;
}

const url = 'https://expo.dev';

const WebViewScreen: React.FC<Props> = ({navigation}) => {
  const webPageLoadNotificationTrigger = useRef(false);
  /**
   * Notification Permission and Setup
   */
  useNotifications();

  const sendNotification = useTriggerNotifications();

  /**
   * Sends a notification with the title "WebView Loaded" and body "Hey, Your page is loaded successfully." after 1 second with type TIME_INTERVAL.
   */
  const sendNotificationWebViewLoad = async () => {
    await sendNotification({
      title: 'WebView Loaded',
      body: 'Hey, Your page is loaded successfully.',
      seconds: 1,
    });
  };

  /**
   * Sends a notification with the title "Reminder Scheduled" and body "Alert scheduled & will notify shortly."
   * after 2 seconds with type TIME_INTERVAL.
   */
  const sendNotification1 = async () => {
    await sendNotification({
      title: 'Reminder Scheduled',
      body: 'Alert scheduled & will notify shortly.',
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
      title: 'Action Completed',
      body: 'Task finished successfully!',
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    });
  };

  const onLoadEnd = () => {
    if (!webPageLoadNotificationTrigger.current) {
      sendNotificationWebViewLoad();
      webPageLoadNotificationTrigger.current = true;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <WebView
        originWhitelist={['*']}
        source={{uri: url}}
        contentInset={{top: 0}}
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        onLoadEnd={onLoadEnd}
      />

      <View className="absolute self-center w-360 gap-3 bottom-0">
        <View className="flex-row justify-center gap-5">
          <Button
            feedbackVariant="ripple"
            onPress={sendNotification1}
            className="bg-[#1976D2] py-3 w-[160px] rounded-lg items-center justify-center">
            <Text className="text-white font-semibold text-base">Notify 1</Text>
          </Button>
          <Button
            feedbackVariant="ripple"
            onPress={sendNotification2}
            className="bg-[#197638] py-3 w-[160px] rounded-lg items-center justify-center">
            <Text className="text-white font-semibold text-base">Notify 2</Text>
          </Button>
        </View>
        <Button
          className="bg-[#A41976] py-3 w-[340px] items-center rounded-lg"
          onPress={() => {
            navigation.navigate('VideoPlayerScreen');
          }}>
          <Text className="text-white font-bold text-base">
            Go To Video Player
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default WebViewScreen;
