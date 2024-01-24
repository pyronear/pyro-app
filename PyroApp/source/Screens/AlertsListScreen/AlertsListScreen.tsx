import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {Alert, alertsService} from '../../../services/alerts.service';
import AlertItem from '../../Components/AlertItem';
import {AlertsListNavigationProps} from '../../Navigation';
import {STYLES} from '../../styles';

function AlertsListScreen({navigation}: AlertsListNavigationProps) {
  const [alerts, setAlerts] = useState<Alert[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: Alert[] = await alertsService.getAlerts();
        setAlerts(res);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToMainScreen = (alertId: number) => {
    navigation.navigate('Main', {alertId: alertId});
  };

  return (
    <View>
      <View style={STYLES.alerts_list.header}>
        <Image
          source={require('../../../assets/pyronear_logo.png')}
          style={STYLES.logo_pyronear_small}
        />
        <Text style={STYLES.alerts_list.title}>ALERTES</Text>
      </View>
      <FlatList
        data={alerts}
        renderItem={({item}) => (
          <AlertItem alert={item} onPress={navigateToMainScreen} />
        )}
      />
    </View>
  );
}

export default AlertsListScreen;
