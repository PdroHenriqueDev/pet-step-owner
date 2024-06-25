import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/base';
import styles from './styles';
import colors from '../../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {useRequest} from '../../../contexts/requestContext';
import {truncateText} from '../../../utils/textUtils';

function InputAddress() {
  const navigation = useNavigation() as any;
  const {receivedLocation} = useRequest();

  const handlePress = () => {
    navigation.navigate('LocationSelector');
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
