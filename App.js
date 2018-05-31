import {Navigation} from 'react-native-navigation'
import BulletinBoardScreen from './src/screens/BulletinBoard/BulletinBoard'


Navigation.registerComponent("soySauce.BulletinBoardScreen", () => BulletinBoardScreen);

Navigation.startSingleScreenApp({
  screen:{
    screen: "soySauce.BulletinBoardScreen",
    title: "掲示板"
  }
});