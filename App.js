import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import BulletinBoardScreen from './src/screens/BulletinBoard/BulletinBoard'
import AuthSwipeScreen from './src/screens/AuthSwipe/AuthSwipe'
import MainTabsScreen from './src/screens/MainTabs/MainTabs'
import BorrowBoardScreen from './src/screens/BorrowBoard/BorrowBoard'
import RendBoardScreen from './src/screens/RendScreen/RendScreen'
import startLogin from './src/models/startLogin/startLogin'
import IndividualChatScreen from './src/screens/IndivudualChat/IndividualChat'
import ChatListScreen from './src/screens/ChatList/ChatList'

import configureStore from './src/store/configureStore'



const store = configureStore();

Navigation.registerComponent("soySauce.BulletinBoardScreen", () => BulletinBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.AuthSwipeScreen", () => AuthSwipeScreen, store, Provider);
Navigation.registerComponent("soySauce.MainTabsScreen", () => MainTabsScreen, store, Provider);
Navigation.registerComponent("soySauce.BorrowBoardScreen", () => BorrowBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.RendBoardScreen", () => RendBoardScreen, store, Provider);
Navigation.registerComponent("soySauce.IndividualChatScreen", () => IndividualChatScreen, store, Provider);
Navigation.registerComponent("soySauce.ChatListScreen", () => ChatListScreen, store, Provider);


export default () => startLogin()
