import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import BulletinBoardScreen from './src/screens/BulletinBoard/BulletinBoard'
import AuthSwipeScreen from './src/screens/AuthSwipe/AuthSwipe'
import { Platform } from 'react-native';
import MainTabsScreen from './src/screens/MainTabs/MainTabs'
import BorrowBoardScreen from './src/screens/BorrowBoard/BorrowBoard'
import RendBoardScreen from './src/screens/RendScreen/RendScreen'
import startLogin from './src/models/startLogin/startLogin'
import IndividualChatScreen from './src/screens/IndivudualChat/IndividualChat'

import configureStore from './src/store/configureStore'

import Icon from 'react-native-vector-icons/Ionicons'


const store = configureStore();

Navigation.registerComponent("soySauce.BulletinBoardScreen", () => BulletinBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.AuthSwipeScreen", () => AuthSwipeScreen, store, Provider);
Navigation.registerComponent("soySauce.MainTabsScreen", () => MainTabsScreen, store, Provider);
Navigation.registerComponent("soySauce.BorrowBoardScreen", () => BorrowBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.RendBoardScreen", () => RendBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.IndividualChatScreen", () => IndividualChatScreen, store, Provider);


export default () => startLogin()
