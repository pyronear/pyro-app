import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { STYLES } from '../styles'

const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
    return(
        <Pressable onPress={onPress} style={[STYLES.container_button, STYLES[`container_button_${type}`]]}>
            <Text style={[STYLES.text_button, STYLES[`text_button_${type}`]]}> {text} </Text>
        </Pressable>
    );
};

export default CustomButton