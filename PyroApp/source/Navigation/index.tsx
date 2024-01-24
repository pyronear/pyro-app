import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '../Screens/SigninScreen/SigninScreen';
import MainScreen from '../Screens/MainScreen/MainScreen';
import AlertsListScreen from '../Screens/AlertsListScreen/AlertsListScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type StackParamList = {
  Signin: undefined;
  Main: {alertId: number};
  AlertsList: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export type MainNavigationProps = NativeStackScreenProps<
  StackParamList,
  'Main'
>;

export type AlertsListNavigationProps = NativeStackScreenProps<
  StackParamList,
  'AlertsList'
>;

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="AlertsList" component={AlertsListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
