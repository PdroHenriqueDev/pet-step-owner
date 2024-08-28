import React, {useState} from 'react';
import {View} from 'react-native';
import CustomButton from '../../../components/customButton';
import {useDialog} from '../../../contexts/dialogContext';
import colors from '../../../styles/colors';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import styles from './styles';
import {updateDefaultPaymentMethod} from '../../../services/ownerService';
import {useOwner} from '../../../contexts/ownerContext';
import {removePaymentMethod} from '../../../services/paymentService';

export default function CardActions() {
  const {route, navigation} = useAppNavigation();
  const {owner} = useOwner();
  const {cardId} = route.params;

  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const [isRemovetLoading, setIsRemoveLoading] = useState(false);

  const {showDialog, hideDialog} = useDialog();

  const handleMakeDefault = async () => {
    if (!owner || !cardId) {
      return;
    }

    setIsDefaultLoading(true);

    try {
      await updateDefaultPaymentMethod({
        ownerId: owner._id,
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

  const handleDelete = async () => {
    if (!owner || !cardId) {
      return;
    }

    setIsRemoveLoading(true);

    try {
      await removePaymentMethod({ownerId: owner._id, paymentMethodId: cardId});

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
    <View className="flex-col" style={styles.container}>
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
