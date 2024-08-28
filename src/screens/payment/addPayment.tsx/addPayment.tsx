import {
  CardField,
  useConfirmSetupIntent,
  BillingDetails,
} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useOwner} from '../../../contexts/ownerContext';
import {getSetupIntent} from '../../../services/paymentService';
import styles from './styles';
import CustomButton from '../../../components/customButton';
import {useDialog} from '../../../contexts/dialogContext';
import {Details} from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import {useNavigation} from '@react-navigation/native';
import {updateDefaultPaymentMethod} from '../../../services/ownerService';

export default function AddPayment() {
  const {owner} = useOwner();
  const {confirmSetupIntent, loading} = useConfirmSetupIntent();
  const {showDialog, hideDialog} = useDialog();
  const [cardDetails, setCardDetails] = useState<Details>(null!);
  const [isLoading, setIsLoading] = useState(false);

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

    const {error, setupIntent} = await confirmSetupIntent(
      setupIntentClientSecret,
      {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      },
    );

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

    const paymentMethodId = setupIntent.paymentMethod?.id;

    if (!paymentMethodId) {
      showDialog({
        title: 'Erro',
        description: 'Falha ao obter o ID do método de pagamento',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

    if (paymentMethodId) {
      setIsLoading(true);
      try {
        await updateDefaultPaymentMethod({ownerId: owner._id, paymentMethodId});
      } catch {
        showDialog({
          title: 'Erro',
          description: 'Falha ao adicionar o método de pagamento',
          confirm: {
            confirmLabel: 'Entendi',
            onConfirm: () => {
              hideDialog();
            },
          },
        });
      } finally {
        setIsLoading(false);
      }
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

      <CustomButton
        onPress={handlePayPress}
        label="Adicionar"
        isLoading={loading || isLoading}
      />
    </View>
  );
}
