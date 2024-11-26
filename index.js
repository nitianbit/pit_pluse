/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NotificationService from './src/services/notification/NotificationService';

NotificationService.initializeBackgroundListener();  

AppRegistry.registerComponent(appName, () => App);
