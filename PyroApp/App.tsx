/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { STYLES } from './source/styles';

import SigninScreen from './source/Screens/SigninScreen/SigninScreen';
import MainScreen from './source/Screens/MainScreen/MainScreen';
import ForgotScreen from './source/Screens/ForgotScreen/ForgotScreen';
import Navigation from './source/Navigation';

const App = () => {
  return (
    <SafeAreaView style={STYLES.root}>
      <Navigation />
    </SafeAreaView>
  );
};

// export default Authentification;

export default App;
