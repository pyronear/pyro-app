/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, ViewStyle, ImageStyle, Button} from 'react-native';
import {alertsService, Alert} from '../../../services/alerts.service';
import CustomButton from '../../Components/CustomButton';
import {authService} from '../../../services/auth.service';
import {
  LeafletView,
  LatLng,
  MapShapeType,
} from '@charlespalmerbf/react-native-leaflet-js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, STYLES} from '../../styles';
import {MainNavigationProps} from '../../Navigation';
import {FlatList} from 'react-native';

const MainScreen = ({route, navigation}: MainNavigationProps) => {
  const alertId: number = route.params.alertId;
  const [alert, setAlert] = useState<Alert | undefined>(undefined);
  const [media, setMedia] = useState<any[] | undefined>(undefined);
  const [alerts_from_event, setAFE] = useState<any[] | undefined>(undefined);
  const [mapCenter, setMapCenter] = useState<LatLng | undefined>({
    lat: 44.6,
    lng: 4.52,
  });
  const [triangleCoordinates, setTriangleCoordinates] = useState<
    LatLng[] | undefined
  >(undefined);

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
  }, [alertId]);

  useEffect(() => {
    const fetchAFE = async () => {
      try {
        if (alert && alert.event_id) {
          const res3: any[] = await alertsService.getAlertsFromEvent(
            alert.event_id,
          );

          setAFE(res3);

          if (res3) {
            const mediaPromises = res3.map(async (alertFromEvent: Alert) => {
              if (alertFromEvent.media_id) {
                return alertsService.getMedia(alertFromEvent.media_id);
              } else {
                return null;
              }
            });

            const mediaResults = await Promise.all(mediaPromises);
            setMedia(mediaResults);
          }
        }
      } catch (error) {
        console.error('Error fetching Alerts From Event:', error);
      }
    };

    fetchAFE();
  }, [alert]);

  return (
    <SafeAreaView
      style={{
        //flex: 1,
        marginHorizontal: 20,
      }}>
      <View style={{alignItems: 'center', marginBottom: 30}}>
        <Text style={{marginTop: 5, color: COLORS.grey_text}}>
          Alerte ID{alertId}
        </Text>
        <View style={{position: 'absolute', top: 0, right: 0}}>
          <Button
            onPress={onLogOutPress}
            title="Log out"
            color={COLORS.background_home}
          />
        </View>
      </View>

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
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 15,
              marginBottom: 5,
            }}>
            Caméra {alert.device_id} Azimuth {alert.azimuth}°
          </Text>
          <Text style={{color: COLORS.grey_text, fontSize: 12}}>
            {alert.created_at}
          </Text>
          <FlatList
            style={STYLES.scrollView}
            data={media}
            renderItem={({item}) => (
              <Image
                source={{uri: item.url}}
                style={STYLES.image as ImageStyle}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 15,
              marginBottom: 5,
            }}>
            Partager le rapport:
          </Text>
          <Button title="Copier le lien" />
          <CustomButton
            text="Acquitter l'alerte"
            type="PRIMARY"
            onPress={() => {
              return null;
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
