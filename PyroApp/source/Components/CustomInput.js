import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {STYLES} from '../styles';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={STYLES.input}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default CustomInput;
