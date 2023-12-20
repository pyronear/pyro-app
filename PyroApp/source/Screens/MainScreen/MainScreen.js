import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {alertsService} from '../../../services/alerts.service';

async function getAlert() {
  return await alertsService.getAlerts();
}

const MainScreen = () => {
  const [alert, setAlert] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
    </View>
  );
};

export default MainScreen;
