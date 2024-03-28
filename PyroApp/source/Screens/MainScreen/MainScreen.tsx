/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  ImageStyle,
  Button,
  Pressable,
  PressableProps,
} from 'react-native';

import {alertsService} from '../../../services/alerts.service';
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
import Clipboard from '@react-native-community/clipboard';
import {Event, eventsService} from '../../../services/events.service';
import {Alert} from '../../../services/alerts.service';

const MainScreen = ({route, navigation}: MainNavigationProps) => {
  const alertId: number = route.params.alertId;
  const [alert, setAlert] = useState<Event | undefined>(undefined);
  const [isAcknowledged, setIsAcknowledged] = useState<boolean>(false);
  const [media, setMedia] = useState<any[] | undefined>(undefined);
  const [alerts_from_event, setAFE] = useState<Alert[] | undefined>(undefined);
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

  function onReturnPress() {
    navigation.navigate('AlertsList');
  }

  async function acknowledgeEvent() {
    await eventsService.acknowledgeEvent(alertId);
    setIsAcknowledged(true);
  }

  function copyLinkToClipBoard() {
    const linkToCopy = 'https://pyronear.org/';
    Clipboard.setString(linkToCopy);
    console.warn('Lien vers la plateforme copié');
  }

  useEffect(() => {
    const fetchAFE = async () => {
      try {
        const res: Event = await eventsService.getEvent(alertId);
        setAlert(res);
        setIsAcknowledged(res.is_acknowledged);

        const res3: Alert[] = await alertsService.getAlertsFromEvent(alertId);
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
          setMapCenter({
            lat: res3[0].lat,
            lng: res3[0].lon,
          });
          const calculatedCoordinates: LatLng[] =
            alertsService.calculateCoordinatesTriangle(res3[0]);
          setTriangleCoordinates(calculatedCoordinates);
        }
      } catch (error) {
        console.error('Error fetching Alerts From Event:', error);
      }
    };

    fetchAFE();
  }, [alertId]);

  return (
    <SafeAreaView
      style={{
        marginHorizontal: 20,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          marginBottom: 20,
          flexDirection: 'row',
        }}>
        <Button
          onPress={onReturnPress}
          title="Retour"
          color={COLORS.background_home}
        />
        <Text style={{marginTop: 5, color: COLORS.grey_text}}>
          Alerte ID{alertId}
        </Text>
        <Button
          onPress={onLogOutPress}
          title="Log out"
          color={COLORS.background_home}
        />
      </View>

      {alert === undefined || alerts_from_event === undefined ? (
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
            Caméra {alerts_from_event[0].device_id} Azimuth{' '}
            {alerts_from_event[0].azimuth}°
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
          <Pressable
            style={STYLES.link_button as PressableProps}
            onPress={copyLinkToClipBoard}>
            <Image
              source={require('../../../assets/lien.png')}
              style={STYLES.link}
            />
            <Text>Copier le lien</Text>
          </Pressable>
          <CustomButton
            text="Acquitter l'alerte"
            disabled={isAcknowledged}
            onPress={acknowledgeEvent}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
