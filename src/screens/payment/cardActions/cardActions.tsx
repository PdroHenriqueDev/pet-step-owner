import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import CustomButton from '../../../components/customButton';
import {useDialog} from '../../../contexts/dialogContext';
import colors from '../../../styles/colors';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import styles from './styles';
import {updateDefaultPaymentMethod} from '../../../services/ownerService';
// import {useOwner} from '../../../contexts/ownerContext';
import {removePaymentMethod} from '../../../services/paymentService';
import {useAuth} from '../../../contexts/authContext';
import {PlataformEnum} from '../../../enums/platform.enum';

export default function CardActions() {
  const {route, navigation} = useAppNavigation();
  // const {owner} = useOwner();
  const {user} = useAuth();
  const {cardId} = route.params;

  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const [isRemovetLoading, setIsRemoveLoading] = useState(false);

  const {showDialog, hideDialog} = useDialog();

  const handleMakeDefault = async () => {
    console.log('got here');
    if (!user || !cardId) {
      return;
    }

    setIsDefaultLoading(true);

    try {
      await updateDefaultPaymentMethod({
        ownerId: user._id as string,
        paymentMethodId: cardId,
      });

      navigation.goBack();
    } catch (err) {
      showDialog({
        title: 'Erro',
        description: 'Falha ao atualizar o método de pagamento',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
    } finally {
      setIsDefaultLoading(false);
    }
  };

  const handleDelete = () => {
    showDialog({
      title: 'Tem certeza?',
      description: 'Deseja realemte excluir esse método de pagamento',
      confirm: {
        confirmLabel: 'Não',
        onConfirm: () => {
          hideDialog();
        },
      },
      cancel: {
        cancelLabel: 'Sim',
        onCancel: async () => {
          hideDialog();
          await deleteCard();
        },
      },
    });
  };

  const deleteCard = async () => {
    if (!user || !cardId) {
      return;
    }

    setIsRemoveLoading(true);

    try {
      await removePaymentMethod({
        ownerId: user._id as string,
        paymentMethodId: cardId,
      });

      navigation.goBack();
    } catch (error) {
      showDialog({
        title: 'Erro',
        description: 'Falha ao excluir o método de pagamento',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });

      navigation.goBack();
    } finally {
      setIsRemoveLoading(false);
    }
  };

  return (
    <View
      className={`flex-1 flex-col bg-primary ${
        Platform.OS === PlataformEnum.IOS ? 'px-5 py-40' : 'px-5 py-20'
      }`}>
      <View className="mb-2">
        <CustomButton
          label={'Tornar Padrão'}
          onPress={handleMakeDefault}
          backgroundColor={colors.secondary}
          isLoading={isDefaultLoading}
          disabled={isRemovetLoading}
        />
      </View>
      <View className="mb-2">
        <CustomButton
          label={'Excluir Cartão'}
          onPress={handleDelete}
          backgroundColor={colors.danger}
          textColor={colors.primary}
          disabled={isDefaultLoading}
          isLoading={isRemovetLoading}
        />
      </View>
    </View>
  );
}
