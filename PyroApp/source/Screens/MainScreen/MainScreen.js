import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {alertsService} from '../../../services/alerts.service';
import CustomButton from '../../Components/CustomButton';
import {authService} from '../../../services/auth.service';
import {useNavigation} from '@react-navigation/native';
import {LatLng, LeafletView} from 'react-native-leaflet-view';
import {SafeAreaView} from 'react-native-safe-area-context';

const MainScreen = () => {
  const [alert, setAlert] = useState(undefined);
  const [DEFAULT_COORDINATE, setDefaultCoordinate] = useState({
    lat: 37.78825,
    lng: -122.4324,
  });

  const navigation = useNavigation();

  async function onLogOutPress() {
    console.warn('Log out');
    await authService.removeToken();
    setAlert(undefined);
    navigation.navigate('Signin');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await alertsService.getAlerts();
        console.log('RESSSSSS', res);
        setAlert(res);
        setDefaultCoordinate({
          lat: res.lat,
          lng: res.lon,
        });
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Text> Détails de l'alerte </Text>
      {alert === undefined ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View
            style={{
              position: 'absolute',
              top: 200,
              left: 0,
              width: '100%',
              height: 200,
              backgroundColor: 'red',
            }}>
            <LeafletView
              mapMarkers={[
                {
                  position: DEFAULT_COORDINATE,
                  icon: '📍',
                  size: [32, 32],
                },
              ]}
              mapCenterPosition={DEFAULT_COORDINATE}
            />
          </View>
          <Text>Date de création: {alert.created_at}</Text>
          <Text>ID de l'événement: {alert.event_id}</Text>
          <Text>Latitude: {alert.lat}</Text>
          <Text>Longitude: {alert.lon}</Text>

          <CustomButton onPress={onLogOutPress} text="Log out" />
        </>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
