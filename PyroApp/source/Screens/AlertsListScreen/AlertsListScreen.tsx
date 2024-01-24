import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Alert, alertsService} from '../../../services/alerts.service';
import AlertItem from '../../Components/AlertItem';
import {AlertsListNavigationProps} from '../../Navigation';

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
      <Text>LISTE ALERTES</Text>
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
