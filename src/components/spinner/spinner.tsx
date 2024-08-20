import React from 'react';
import styles from './styles';
import colors from '../../styles/colors';
import {ActivityIndicator, View} from 'react-native';

export default function Spinner({
  size = 'large',
}: {
  size?: number | 'small' | 'large' | undefined;
}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.secondary} size={size} />
    </View>
  );
}
