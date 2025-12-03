import useTriggerNotifications from '@/hooks/use-send-Notification';
import useNotifications from '@/hooks/useNotification';
import * as Notifications from 'expo-notifications';
import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
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

  const inset = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={{bottom: 'additive'}}>
      <WebView
        originWhitelist={['*']}
        source={{uri: url}}
        contentInset={{top: 0}}
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        onLoadEnd={onLoadEnd}
      />

      <View style={[styles.buttons, {bottom: inset.bottom + 20}]}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={sendNotification1}>
            <Text style={styles.btnText}>{'Notify 1'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn3} onPress={sendNotification2}>
            <Text style={styles.btnText}>{'Notify 2'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btn2}
          onPress={() => {
            navigation.navigate('VideoPlayerScreen');
          }}>
          <Text style={styles.btnText}>Go To Video Player</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WebViewScreen;
