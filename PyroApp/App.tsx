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

import SigninScreen from './source/Screens/SigninScreen';
import MainScreen from './source/Screens/MainScreen';
import ForgotScreen from './source/Screens/ForgotScreen';
import Navigation from './source/Navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundcolor: '#F9FBFC'
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

// export default Authentification;

export default App;
