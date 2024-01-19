import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {authService} from '../../../services/auth.service';
import {STYLES} from '../../styles';

const SigninScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  async function onSignInPressed() {
    try {
      await authService.login(username, password);
      navigation.navigate('Main');
    } catch (error) {
      console.log(error);
    }
  }

  const onForgotPasswordPressed = () => {
    console.warn('onForgotPasswordPressed');

    navigation.navigate('Forgot');
  };

  return (
    <View style={STYLES.root}>
      <View style={STYLES.signin_input}>
        <CustomInput
          placeholder="Utilisateur"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Mot de passe"
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
    </View>
  );
};

export default SigninScreen;
