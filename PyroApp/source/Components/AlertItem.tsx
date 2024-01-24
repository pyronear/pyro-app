import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {Alert} from '../../services/alerts.service';

function AlertItem(props: {alert: Alert}) {
  function onPressButton() {
    console.warn('You tapped the button!');
  }

  return (
    <View>
      <TouchableHighlight onPress={onPressButton} underlayColor="white">
        <>
          <Text>Alert {props.alert.id} (en cours)</Text>
          <Text>{props.alert.created_at}</Text>
        </>
      </TouchableHighlight>
    </View>
  );
}

export default AlertItem;
