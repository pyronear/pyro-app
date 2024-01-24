import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {Alert} from '../../services/alerts.service';
import {STYLES} from '../styles';
import {convertFormatDate} from '../../utils/date';

function AlertItem(props: {alert: Alert; onPress: (alertId: number) => void}) {
  return (
    <TouchableHighlight
      onPress={() => props.onPress(props.alert.id)}
      underlayColor="white"
      style={STYLES.alert_item.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={STYLES.alert_item.circle} />
        <View style={{flexDirection: 'column'}}>
          <Text style={STYLES.alert_item.title}>
            Alerte {props.alert.id} (en cours)
          </Text>
          <Text>{convertFormatDate(props.alert.created_at)}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default AlertItem;
