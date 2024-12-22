import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index';
import SearchScreen from './components/searchSection/SearchScreen';
import { RootStackParamList } from './RootStackParamList';
import GoogleLens from './components/lens/GoogleLens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index"  screenOptions={{
        headerShown: false,
      }}>
       <Stack.Screen name='Index' component={Index}/>
       <Stack.Screen name='SearchScreen' component={SearchScreen}/>
       <Stack.Screen name='GoogleLens' component={GoogleLens}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
