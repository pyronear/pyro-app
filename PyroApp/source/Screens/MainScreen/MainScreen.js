import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {alertsService} from '../../../services/alerts.service';
import CustomButton from '../../Components/CustomButton';
import {authService} from '../../../services/auth.service';
import {useNavigation} from '@react-navigation/native';
import {LeafletView} from 'react-native-leaflet-view';
import {SafeAreaView} from 'react-native-safe-area-context';

const MainScreen = () => {
  const [alert, setAlert] = useState(undefined);
  const [mapCenter, setMapCenter] = useState({
    lat: 1.0,
    lng: 1.0,
  });
  const [triangleCoordinates, setTriangleCoordinates] = useState([
    [1, 1],
    [1, 1],
    [1, 1],
  ]);

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
        const res = await alertsService.getAlert();
        setAlert(res);
        setMapCenter({
          lat: res.lat,
          lng: res.lon,
        });
        const calculatedCoordinates =
          alertsService.calculateCoordinatesTriangle(res);
        setTriangleCoordinates(calculatedCoordinates);
      } catch (error) {
        console.error('Error fetching alert details:', error);
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
              mapShapes={[
                {
                  shapeType: 'Polygon',
                  positions: triangleCoordinates,
                  color: 'red',
                },
                {
                  shapeType: 'Circle',
                  center: [mapCenter.lat, mapCenter.lng],
                  radius: 400,
                  color: 'red',
                },
              ]}
              mapCenterPosition={mapCenter}
            />
          </View>
          <Text>Date de création: {alert.created_at}</Text>
          <Text>ID de l'événement: {alert.event_id}</Text>
          <Text>Latitude: {alert.lat}</Text>
          <Text>Longitude: {alert.lon}</Text>
          <Text>Azimuth: {alert.azimuth}°</Text>

          <CustomButton onPress={onLogOutPress} text="Log out" />
        </>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
