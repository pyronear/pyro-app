import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {alertsService} from '../../../services/alerts.service';
import CustomButton from '../../Components/CustomButton';
import {authService} from '../../../services/auth.service';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {
  const [alert, setAlert] = useState(undefined);
  const navigation = useNavigation();

  async function onLogOutPress() {
    console.warn('Log out');
    await authService.removeToken();
    navigation.navigate('Signin');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await alertsService.getAlerts();
        setAlert(res);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text> Détails de l'alerte </Text>
      {alert == undefined ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>Date de création: {alert.created_at}</Text>
          <Text>ID de l'événement: {alert.event_id}</Text>
          <Text>Latitude: {alert.lat}</Text>
          <Text>Longitude: {alert.lon}</Text>
        </>
      )}
      <CustomButton text="Log out" onPress={onLogOutPress}></CustomButton>
    </View>
  );
};

export default MainScreen;
