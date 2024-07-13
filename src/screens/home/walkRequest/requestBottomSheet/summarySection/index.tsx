import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {useRequest} from '../../../../../contexts/requestContext';

export default function SummarySection() {
  const {selectedDogIds, selectedTime} = useRequest();

  // Preço por dog e por tempo
  const pricePerDog = 4.99;
  const basePrice = 15.99;

  // Calculando o preço total
  const totalDogsPrice = selectedDogIds.length * pricePerDog;
  const totalPrice = totalDogsPrice + (selectedTime ? basePrice : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Dogs: {selectedDogIds.length} x R$ {pricePerDog.toFixed(2)}
      </Text>

      <Text style={styles.text}>
        Tempo - {selectedTime} min: R$ {basePrice.toFixed(2)}
      </Text>

      <Text style={styles.totalText}>
        Preço total: R$ {totalPrice.toFixed(2)}
      </Text>
    </View>
  );
}
