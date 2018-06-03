import {Navigation} from 'react-native-navigation'
import {Provider} from 'react-redux'
import BulletinBoardScreen from './src/screens/BulletinBoard/BulletinBoard'
import AuthSwipeScreen from './src/screens/AuthSwipe/AuthSwipe'

import configureStore from './src/store/configureStore'

const store = configureStore();

Navigation.registerComponent("soySauce.BulletinBoardScreen", () => BulletinBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.AuthSwipeScreen", () => AuthSwipeScreen, store, Provider);


Navigation.startSingleScreenApp({
  screen:{
    screen: "soySauce.AuthSwipeScreen",
    title: "login"
  }
});