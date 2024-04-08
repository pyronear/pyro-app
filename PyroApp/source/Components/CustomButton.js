import React from 'react';
import {Text, Pressable} from 'react-native';
import {STYLES} from '../styles';

const CustomButton = ({onPress, text, type = 'PRIMARY', disabled}) => {
  const containerStyle = [
    STYLES.container_button,
    STYLES[`container_button_${type}`],
    disabled && STYLES.disabled_container,
  ];

  const textStyle = [
    STYLES.text_button,
    STYLES[`text_button_${type}`],
    disabled && STYLES.disabled_text,
  ];

  return (
    <Pressable onPress={onPress} disabled={disabled} style={containerStyle}>
      <Text style={textStyle}> {text} </Text>
    </Pressable>
  );
};

export default CustomButton;
