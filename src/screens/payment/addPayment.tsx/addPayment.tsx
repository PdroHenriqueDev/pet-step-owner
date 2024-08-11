import {
  CardField,
  useConfirmSetupIntent,
  BillingDetails,
} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useOwner} from '../../../contexts/ownerContext';
import {getSetupIntent} from '../../../services/stripeService';
import styles from './styles';
import CustomButton from '../../../components/customButton';
import {useDialog} from '../../../contexts/dialogContext';
import {Details} from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import {useNavigation} from '@react-navigation/native';

export default function AddPayment() {
  const {owner} = useOwner();
  const {confirmSetupIntent, loading} = useConfirmSetupIntent();
  const {showDialog, hideDialog} = useDialog();
  const [cardDetails, setCardDetails] = useState<Details>(null!);

  const navigation = useNavigation();

  const handlePayPress = async () => {
    if (!owner) {
      return;
    }

    if (!cardDetails?.complete) {
      showDialog({
        title: 'Cartão incompleto',
        description: 'Por favor, preencha todos os detalhes do cartão.',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

    const billingDetails: BillingDetails = {
      email: owner.email,
    };

    const {customerStripe} = owner;

    const setupIntentData = await getSetupIntent(customerStripe.id);
    const {setupIntentClientSecret} = setupIntentData;

    const {error} = await confirmSetupIntent(setupIntentClientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      showDialog({
        title: 'Algo de errado com o cartão',
        description: 'Tente novamente ou cadastre outro cartão',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });

      return;
    }

    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.cardStyle}
        style={styles.cardField}
        onCardChange={value => {
          setCardDetails(value);
        }}
      />

      <CustomButton onPress={handlePayPress} label="Adicionar" />
    </View>
  );
}
