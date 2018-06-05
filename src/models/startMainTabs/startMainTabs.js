import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default () =>
Promise.all([
  Icon.getImageSource(
    Platform.OS === "android" ? "md-menu" : "ios-menu", 30),
]).
  then(sources => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "soySauce.MainTabsScreen",
        // title: "メイン",
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