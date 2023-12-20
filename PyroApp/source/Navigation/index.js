import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SigninScreen from '../Screens/SigninScreen/SigninScreen';
import MainScreen from '../Screens/MainScreen/MainScreen';
import ForgotScreen from '../Screens/ForgotScreen/ForgotScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Signin" component={SigninScreen} />
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Forgot" component={ForgotScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;