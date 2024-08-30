import 'react-native-gesture-handler';
import PushNotification from "react-native-push-notification";

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Square from './Squarepay';
import {name as appName} from './app.json';

// PushNotification.configure({
//   onNotification: function (notification) {
//     // notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   onRegistrationError: function (err) {
//     console.error(err.message, err);
//   },
//   // popInitialNotification: true,
//   // requestPermissions: true,
// });

AppRegistry.registerComponent(appName, () => Square);
