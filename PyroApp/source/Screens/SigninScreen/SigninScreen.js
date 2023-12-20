import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {authService} from '../../../services/auth.service';

const SigninScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  async function onSignInPressed() {
    authService.login(username, password).then(() => {
      navigation.navigate('Main');
    });
  }

  const onForgotPasswordPressed = () => {
    console.warn('onForgotPasswordPressed');

    navigation.navigate('Forgot');
  };

  return (
    <View>
      <Text> Sign In Screen </Text>
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton text="Sign In" onPress={onSignInPressed} />

      <CustomButton
        text="Forgot Password"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />
    </View>
  );
};

export default SigninScreen;
