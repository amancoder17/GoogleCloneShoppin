import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";  
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const WrappedApp = () => (

    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>

);

AppRegistry.registerComponent(appName, () => WrappedApp);
