import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {CostDataProps} from '../../../../../interfaces/costData';

interface SummarySectionProps {
  costData?: CostDataProps;
}

export default function SummarySection({costData}: SummarySectionProps) {
  const {dogPrice, walkPrice, totalCost} = costData!;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Dogs: {dogPrice.numberOfDogs} x R$ {dogPrice.pricePerDog}
      </Text>

      <Text style={styles.text}>
        Tempo - {walkPrice.durationMinutes} min: R$ {walkPrice.price}
      </Text>

      <Text style={styles.totalText}>Preço total: R$ {totalCost}</Text>
    </View>
  );
}
