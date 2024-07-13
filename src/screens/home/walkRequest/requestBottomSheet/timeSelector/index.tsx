import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRequest} from '../../../../../contexts/requestContext';
import styles from './styles';
import colors from '../../../../../styles/colors';
import {CheckBox} from '@rneui/base';

const timeOptions = [
  {label: '15 minutos', value: 15},
  {label: '30 minutos', value: 30},
  {label: '60 minutos', value: 60},
];

export default function TimeSelector() {
  const {selectedTime, onselectedTime} = useRequest();

  const handleTimeSelect = (value: number) => {
    onselectedTime(value);
  };

  return (
    <View>
      {timeOptions.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionContainer,
            index !== timeOptions.length - 1 && styles.optionMargin,
          ]}
          onPress={() => handleTimeSelect(option.value)}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>{option.label}</Text>
            <CheckBox
              checked={selectedTime === option.value}
              onPress={() => handleTimeSelect(option.value)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={colors.dark}
              uncheckedColor={colors.dark}
              containerStyle={styles.checkBox}
              size={20}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
