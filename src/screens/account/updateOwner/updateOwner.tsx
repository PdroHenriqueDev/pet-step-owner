import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import globalStyles from '../../../styles/globalStyles';
import styles from './styles';

export default function UpdateOwner() {
  const {route} = useAppNavigation();
  const {field} = route.params;
  const [value, setValue] = useState(field.value || '');

  const handleSave = () => {
    console.log('Novo valor salvo:', value);
  };

  return (
    <View className="flex-1 items-center p-5 bg-primary">
      <Text style={globalStyles.headerTitle}>{field.label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={`Digite seu ${field.label.toLowerCase()}`}
      />
    </View>
  );
}
