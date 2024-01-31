import React from 'react';
import {SafeAreaView} from 'react-native';

import {STYLES} from './source/styles';


import Navigation from './source/Navigation';

const App = () => {
  return (
    <SafeAreaView style={STYLES.root}>
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
