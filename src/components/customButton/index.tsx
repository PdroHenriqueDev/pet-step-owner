import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import colors from '../../styles/colors';

function CustomButton({
  title,
  onPress,
  backgroundColor = colors.secondary,
  textColor = colors.dark,
  style,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor}, style]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
