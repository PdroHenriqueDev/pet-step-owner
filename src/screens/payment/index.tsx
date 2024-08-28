import React, {useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useState} from 'react';
import {getPaymentsMethods} from '../../services/ownerService';
import {useOwner} from '../../contexts/ownerContext';
import {Icon, ListItem} from '@rneui/base';
import {CardBrand, PaymentMethodProps} from '../../interfaces/payment';
import globalStyles from '../../styles/globalStyles';
import {useFocusEffect} from '@react-navigation/native';
import Spinner from '../../components/spinner/spinner';
import {useAppNavigation} from '../../hooks/useAppNavigation';

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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodProps[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const {navigation} = useAppNavigation();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const fetchPaymentMethods = async () => {
        if (!owner) {
          return;
        }
        try {
          const response = await getPaymentsMethods(owner._id);
          const sortedPaymentMethods = response.sort((a, b) => {
            if (a.isSelected) {
              return -1;
            }
            if (b.isSelected) {
              return 1;
            }
            return 0;
          });

          setPaymentMethods(sortedPaymentMethods);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchPaymentMethods();
    }, [owner]),
  );

  const handlePress = (cardId: string) => {
    navigation.navigate('CardActions', {cardId});
  };
  const addCardRoute = () => {
    navigation.navigate('AddPaymentScreen');
  };

  const renderItem = ({
    item: {
      isSelected,
      id,
      card: {brand, last4, funding, exp_month, exp_year},
    },
  }: {
    item: PaymentMethodProps;
  }) => (
    <ListItem
      bottomDivider
      onPress={() => handlePress(id)}
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

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={globalStyles.label}>
        Nenhum método de pagamento encontrado. Adicione um cartão para
        continuar.
      </Text>
    </View>
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
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </View>
  );
}
