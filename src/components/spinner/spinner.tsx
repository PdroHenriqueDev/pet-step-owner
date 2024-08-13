import React from 'react';
import {DialogLoading} from '@rneui/base/dist/Dialog/Dialog.Loading';
import styles from './styles';
import colors from '../../styles/colors';
import {View} from 'react-native';

export default function Spinner({
  size = 'large',
}: {
  size?: number | 'small' | 'large' | undefined;
}) {
  return (
    <View style={styles.container}>
      <DialogLoading
        loadingProps={{
          color: colors.secondary,
          size,
        }}
      />
    </View>
  );
}
