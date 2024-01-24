import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Alert, alertsService} from '../../../services/alerts.service';

function AlertsListScreen() {
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

  return (
    <View>
      <Text>LISTE ALERTES</Text>
      <FlatList data={alerts} renderItem={({item}) => <Text>{item.id}</Text>} />
    </View>
  );
}

export default AlertsListScreen;
