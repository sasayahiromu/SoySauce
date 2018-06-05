import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import BulletinBoardScreen from './src/screens/BulletinBoard/BulletinBoard'
import AuthSwipeScreen from './src/screens/AuthSwipe/AuthSwipe'
import { Platform } from 'react-native';

import configureStore from './src/store/configureStore'

import Icon from 'react-native-vector-icons/Ionicons'


const store = configureStore();

Navigation.registerComponent("soySauce.BulletinBoardScreen", () => BulletinBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.AuthSwipeScreen", () => AuthSwipeScreen, store, Provider);

export default () =>
Promise.all([
  Icon.getImageSource(
    Platform.OS === "android" ? "md-menu" : "ios-menu", 30),
]).
  then(sources => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "soySauce.BulletinBoardScreen",
        title: "掲示板",
        navigatorButtons: {
          leftButtons: [{
            icon: sources[0],
            title: 'Menu',
            id: "sideDrawerToggle"
          }]
        }
      },
    });
  })