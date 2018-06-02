import {Navigation} from 'react-native-navigation'
import {Provider} from 'react-redux'
import BulletinBoardScreen from './src/screens/BulletinBoard/BulletinBoard'

import configureStore from './src/store/configureStore'

const store = configureStore();

Navigation.registerComponent("soySauce.BulletinBoardScreen", () => BulletinBoardScreen, store, Provider);

Navigation.startSingleScreenApp({
  screen:{
    screen: "soySauce.BulletinBoardScreen",
    title: "掲示板"
  }
});