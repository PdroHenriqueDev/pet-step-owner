import React, {useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useState} from 'react';
import {getPaymentsMethods} from '../../services/ownerService';
import {useOwner} from '../../contexts/ownerContext';
import {Icon, ListItem} from '@rneui/base';
import {CardBrand, PaymentMethodProps} from '../../interfaces/payment';
import globalStyles from '../../styles/globalStyles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Spinner from '../../components/spinner/spinner';

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
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation() as any;

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
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
    }, [owner]),
  );

  const handlePress = () => {};
  const addCardRoute = () => {
    navigation.navigate('AddPaymentScreen');
  };

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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <View className="flex-row items-center justify-between">
            <Text style={globalStyles.headerTitle}>Pagamentos</Text>
            <TouchableOpacity onPress={addCardRoute}>
              <Text style={globalStyles.headerSubtitle}>Adicionar cartão</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={paymentMethods}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </View>
  );
}
