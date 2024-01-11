import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { STYLES } from '../styles'

const CustomInput = ( {value, setValue, placeholder, secureTextEntry}) => {
    return(
        <View style={STYLES.container_input}>
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder = {placeholder}
            styles={STYLES.input}
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

export default CustomInput