import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import CustomButton from '../../../../../components/customButton';

interface SummarySectionProps {
  onConfirm: () => void;
}

export default function SummarySection({onConfirm}: SummarySectionProps) {
  return (
    <View style={styles.fixedFooter}>
      <CustomButton label={'Confirmar'} onPress={onConfirm} />
    </View>
  );
}
