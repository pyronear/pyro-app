import React, {useState} from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';

const SigninScreen = () => {
    const {username, setUsername} =useState('');
    const {password, setPassword} =useState('');

    const onSignInPressed = () => {
        console.warn("Sign In")
    }

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed')
    }

    return(
        <View>
            <Text> Sign In Screen </Text>
            <CustomInput 
                placeholder="Username" 
                value={username} 
                setValue={setUsername}
                // secureTextEntry={false}
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
            />

            <CustomButton 
                text="Sign In" 
                onPress={onSignInPressed} 
            />

            <CustomButton 
                text="Forgot Password" 
                onPress={onForgotPasswordPressed} 
                type="TERTIARY"
            />
        </View>
    );
};

export default SigninScreen