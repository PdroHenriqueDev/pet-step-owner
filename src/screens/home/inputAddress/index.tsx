import React from 'react';
import {TextInput, View} from 'react-native';
import {Icon} from '@rneui/base';
import styles from './styles';
import colors from '../../../styles/colors';

function InputAddress() {
  return (
    <>
      <View style={styles.container}>
        <Icon
          type="font-awesome-6"
          name="location-pin"
          size={20}
          color={colors.dark}
          style={styles.icon}
        />
        <TextInput placeholder="Inicio do passeio" />
      </View>
    </>
  );
}

export default InputAddress;
