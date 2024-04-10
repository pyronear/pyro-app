import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {STYLES} from '../styles';
import {convertFormatDate} from '../../utils/date';
import {Event} from '../../services/events.service';

function AlertItem(props: {alert: Event; onPress: (alertId: number) => void}) {
  return (
    <TouchableHighlight
      onPress={() => props.onPress(props.alert.id)}
      underlayColor="white"
      style={STYLES.alert_item.container}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={
            props.alert.is_acknowledged
              ? STYLES.alert_item.green_circle
              : STYLES.alert_item.orange_circle
          }
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={STYLES.alert_item.title}>
            Alerte {props.alert.id} (
            {props.alert.is_acknowledged ? 'acquittée' : 'en cours'})
          </Text>
          <Text>{convertFormatDate(props.alert.created_at)}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default AlertItem;
