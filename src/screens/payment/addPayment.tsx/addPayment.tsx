import {
  CardField,
  useConfirmSetupIntent,
  BillingDetails,
} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import styles from './styles';
import CustomButton from '../../../components/customButton';
import {useDialog} from '../../../contexts/dialogContext';
import {Details} from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import {useNavigation} from '@react-navigation/native';
import {
  getPaymentIntent,
  updateDefaultPaymentMethod,
} from '../../../services/ownerService';
import {useAuth} from '../../../contexts/authContext';
import {PlataformEnum} from '../../../enums/platform.enum';

export default function AddPayment() {
  const {user} = useAuth();
  const {confirmSetupIntent, loading} = useConfirmSetupIntent();
  const {showDialog, hideDialog} = useDialog();
  const [cardDetails, setCardDetails] = useState<Details>(null!);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handlePayPress = async () => {
    if (!user) {
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
      email: user.email,
    };

    const setupIntentData = await getPaymentIntent();
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
      console.log('got here error =>', error);
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
        await updateDefaultPaymentMethod({
          ownerId: user._id as string,
          paymentMethodId,
        });
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
    <View
      className={`flex-1 bg-primary ${
        Platform.OS === PlataformEnum.IOS ? 'px-5 py-40' : 'px-5 py-10'
      }`}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '1111 1111 1111 1111',
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
