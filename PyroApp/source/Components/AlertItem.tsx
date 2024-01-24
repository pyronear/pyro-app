import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {Alert} from '../../services/alerts.service';

function AlertItem(props: {alert: Alert; onPress: () => void}) {
  return (
    <View>
      <TouchableHighlight onPress={props.onPress} underlayColor="white">
        <>
          <Text>Alert {props.alert.id} (en cours)</Text>
          <Text>{props.alert.created_at}</Text>
        </>
      </TouchableHighlight>
    </View>
  );
}

export default AlertItem;
