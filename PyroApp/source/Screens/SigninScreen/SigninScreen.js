import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {authService} from '../../../services/auth.service';
import {STYLES} from '../../styles';

const SigninScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inError, setInError] = useState(false);

  const navigation = useNavigation();

  async function onSignInPressed() {
    try {
      await authService.login(username, password);
      setInError(false);
      navigation.navigate('AlertsList');
    } catch (error) {
      setInError(true);
      console.log(error);
    }
  }

  return (
    <View style={STYLES.root}>
      <View style={STYLES.signin_input}>
        <Image
          source={require('../../../assets/pyronear_logo.png')}
          style={STYLES.logo_pyronear}></Image>
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
        {inError ? (
          <Text style={STYLES.error_text_signin}>Ce compte n'existe pas</Text>
        ) : (
          ''
        )}

        <CustomButton text="CONNEXION" onPress={onSignInPressed} />
      </View>
    </View>
  );
};

export default SigninScreen;
