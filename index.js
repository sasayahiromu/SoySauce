import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './src/utility/bgMessaging';
AppRegistry.registerComponent('SoySauce', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
