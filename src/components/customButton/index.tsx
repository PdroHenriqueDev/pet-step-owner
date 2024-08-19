import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import colors from '../../styles/colors';
import {DialogLoading} from '@rneui/base/dist/Dialog/Dialog.Loading';
import {CustomButtonProps} from '../../interfaces/customButton';

function CustomButton({
  label,
  onPress,
  backgroundColor = colors.secondary,
  textColor = colors.dark,
  style,
  isLoading = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={!isLoading ? onPress : undefined}
      style={[styles.button, {backgroundColor}, style]}
      disabled={isLoading}>
      {isLoading ? (
        <DialogLoading
          loadingProps={{
            color: colors.primary,
            size: 'small',
            style: {
              margin: 0,
              padding: 0,
            },
          }}
        />
      ) : (
        <Text style={[styles.buttonText, {color: textColor}]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export default CustomButton;
