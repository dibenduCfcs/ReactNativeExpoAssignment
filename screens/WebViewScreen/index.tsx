import CustomButton from '@/components/CustomButton';
import useTriggerNotifications from '@/hooks/use-send-Notification';
import useNotifications from '@/hooks/useNotification';
import * as Notifications from 'expo-notifications';
import React, {useRef} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import '../../global.css';

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
        className="flex-1"
        originWhitelist={['*']}
        source={{uri: url}}
        contentInset={{top: 0}}
        automaticallyAdjustContentInsets={false}
        onLoadEnd={onLoadEnd}
      />

      <View className="absolute self-center w-360 gap-3 bottom-safe-offset-5">
        <View className="flex-row justify-center gap-5">
          <CustomButton
            className="bg-[#1976D2]"
            onPress={sendNotification1}
            buttonName={'Notify 1'}
          />
          <CustomButton
            className="bg-[#197638]"
            onPress={sendNotification2}
            buttonName={'Notify 2'}
          />
        </View>
        <CustomButton
          className="bg-[#A41976] w-[340]"
          onPress={() => {
            navigation.navigate('VideoPlayerScreen');
          }}
          buttonName={'Go To Video Player'}
        />
      </View>
    </View>
  );
};

export default WebViewScreen;
