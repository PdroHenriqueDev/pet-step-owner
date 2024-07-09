import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import CustomButton from '../../../../../components/customButton';

export default function SummarySection() {
  return (
    <View style={styles.fixedFooter}>
      <CustomButton label={'Confirmar'} />
    </View>
  );
}
