import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/base';
import styles from './styles';
import colors from '../../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {useLocation} from '../../../contexts/locationContext';

function InputAddress() {
  const navigation = useNavigation() as any;
  const {receivedLocation} = useLocation();

  const handlePress = () => {
    navigation.navigate('LocationSelector');
  };

  const truncateText = ({
    text,
    maxLength,
  }: {
    text: string;
    maxLength: number;
  }) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength - 3)}...`;
    }
    return text;
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Icon
        type="font-awesome-6"
        name="location-pin"
        size={20}
        color={colors.dark}
        style={styles.icon}
      />
      <TextInput
        editable={false}
        placeholder="Inicio do passeio"
        value={truncateText({
          text: receivedLocation?.description || '',
          maxLength: 40,
        })}
        style={styles.input}
        maxLength={40}
      />
    </TouchableOpacity>
  );
}

export default InputAddress;
