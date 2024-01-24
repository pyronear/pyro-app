import React, {useEffect, useState} from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {alertsService, Alert} from '../../../services/alerts.service';
import CustomButton from '../../Components/CustomButton';
import {authService} from '../../../services/auth.service';
import {useNavigation} from '@react-navigation/native';
import {LeafletView, LatLng, MapShapeType} from 'react-native-leaflet-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {STYLES} from '../../styles';
import {MainNavigationProps} from '../../Navigation';

const MainScreen = ({route}: MainNavigationProps) => {
  const alertId: number = route.params.alertId;
  const [alert, setAlert] = useState<Alert | undefined>(undefined);
  const [mapCenter, setMapCenter] = useState<LatLng | undefined>({
    lat: 44.6,
    lng: 4.52,
  });
  const [triangleCoordinates, setTriangleCoordinates] = useState<
    LatLng[] | undefined
  >(undefined);

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
        const res: Alert = await alertsService.getAlert(alertId);
        setAlert(res);
        setMapCenter({
          lat: res.lat,
          lng: res.lon,
        });
        const calculatedCoordinates: LatLng[] =
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
          <View style={STYLES.map_view as ViewStyle}>
            <LeafletView
              mapShapes={[
                {
                  shapeType: MapShapeType.POLYGON,
                  positions: triangleCoordinates,
                  color: 'red',
                },
                {
                  shapeType: MapShapeType.CIRCLE,
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
