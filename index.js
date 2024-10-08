/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

navigator.geolocation = require('@react-native-community/geolocation');

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const {notification, data} = remoteMessage;
  if (notification) {
    // await onDisplayNotification({
    //   title: notification.title,
    //   body: notification.body,
    // });
  }

  if (data) {
    console.log(`Request ID: ${data}`, data);
  }
});

AppRegistry.registerComponent(appName, () => App);
