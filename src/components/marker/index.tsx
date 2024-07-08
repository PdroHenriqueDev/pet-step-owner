import React from 'react';
import styles from './styles';
import {Icon} from '@rneui/base';
import colors from '../../styles/colors';
import {View} from 'react-native';

function Marker() {
  return (
    <View style={styles.markerFixed}>
      <Icon
        style={styles.marker}
        type="font-awesome-6"
        name="location-pin"
        size={40}
        color={colors.dark}
      />
    </View>
  );
}

export default Marker;
