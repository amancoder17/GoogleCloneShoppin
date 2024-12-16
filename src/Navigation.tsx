import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index';
import SearchScreen from './components/searchSection/SearchScreen';
import { RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index"  screenOptions={{
        headerShown: false,
      }}>
       <Stack.Screen name='Index' component={Index}/>
       <Stack.Screen name='SearchScreen' component={SearchScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
