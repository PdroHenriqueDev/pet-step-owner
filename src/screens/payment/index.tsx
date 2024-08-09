import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useEffect, useState} from 'react';
import {getPaymentsMethods} from '../../services/ownerService';
import {useOwner} from '../../contexts/ownerContext';
import {Button, Icon, ListItem} from '@rneui/base';
import {CardBrand, PaymentMethodProps} from '../../interfaces/payment';
import globalStyles from '../../styles/globalStyles';

const icons: Record<CardBrand, {type: string; name: string}> = {
  visa: {
    type: 'font-awesome-5',
    name: 'cc-visa',
  },
  amex: {
    type: 'font-awesome-5',
    name: 'cc-amex',
  },
  mastercard: {
    type: 'font-awesome-5',
    name: 'cc-mastercard',
  },
};

export default function Payment() {
  const {owner} = useOwner();
  const [paymentMethods, setPaymentMethods] = useState([
    // {
    //   id: '1',
    //   card: {
    //     brand: 'visa' as CardBrand,
    //     last4: '1234',
    //     exp_month: 12,
    //     exp_year: 2024,
    //     funding: 'credit',
    //   },
    // },
    // {
    //   id: '2',
    //   card: {
    //     brand: 'amex' as CardBrand,
    //     last4: '5678',
    //     exp_month: 11,
    //     exp_year: 2023,
    //     funding: 'credit',
    //   },
    // },
    // {
    //   id: '3',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '4',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '5',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '6',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '7',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '8',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '9',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '10',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '11',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
    // {
    //   id: '12',
    //   card: {
    //     brand: 'mastercard' as CardBrand,
    //     last4: '9012',
    //     exp_month: 10,
    //     exp_year: 2025,
    //     funding: 'debit',
    //   },
    // },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!owner) {
        return;
      }
      try {
        const response = await getPaymentsMethods(owner._id);
        setPaymentMethods(response as any);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [owner]);

  const handlePress = () => {};
  const addCard = () => {};

  const renderItem = ({
    item: {
      isSelected,
      card: {brand, last4, funding, exp_month, exp_year},
    },
  }: {
    item: PaymentMethodProps;
  }) => (
    <ListItem
      bottomDivider
      onPress={handlePress}
      containerStyle={styles.listItem}>
      <Icon
        name={icons[brand]?.name ?? 'credit-card'}
        type={icons[brand]?.type ?? 'font-awesome-5'}
      />

      <ListItem.Content>
        <ListItem.Title style={styles.cardNumber}>
          **** **** **** {last4} {funding === 'credit' ? '(Crédito)' : ''}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.cardExpiry}>
          {exp_month}/{exp_year}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View className="flex-row items-center justify-between">
        {isSelected && (
          <Text style={globalStyles.selectedText} className="mr-2">
            selecionado
          </Text>
        )}
        <ListItem.Chevron />
      </View>
    </ListItem>
  );
  return (
    <View style={styles.container}>
      <View className="flex-row items-center justify-between">
        <Text style={globalStyles.headerTitle}>Pagamentos</Text>
        <TouchableOpacity onPress={addCard}>
          <Text style={globalStyles.headerSubtitle}>Adicionar cartão</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={paymentMethods}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
