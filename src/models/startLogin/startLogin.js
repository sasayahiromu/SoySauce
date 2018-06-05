import { Navigation } from 'react-native-navigation'

export default () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: "soySauce.AuthSwipeScreen",
      title: "ログイン"
    },
  });