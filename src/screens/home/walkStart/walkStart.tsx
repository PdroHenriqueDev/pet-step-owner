import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Spinner from '../../../components/spinner/spinner';
import styles from './styles';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import {
  connectSocket,
  disconnectSocket,
  listenToEvent,
} from '../../../services/socketService';

const messages: {[key: string]: string} = {
  [WalkEvents.PAYMENT_FAILURE]:
    'O pagamento não foi concluído. Verifique suas informações e tente novamente. Se o problema persistir, entre em contato com o suporte.',
  [WalkEvents.ACCEPTED_SUCCESSFULLY]: 'O passeio foi aceito com sucesso.',
  [WalkEvents.SERVER_ERROR]:
    'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
  [WalkEvents.CANCELLED]:
    'O passeio foi cancelado. Por favor, tente selecionar outro Dog Walker.',
  [WalkEvents.REQUEST_DENIED]:
    'O Dog Walker selecionado não está disponível no momento. Por favor, tente novamente mais tarde ou escolha outro Dog Walker para o passeio.',
  default:
    'Estamos notificando o Dog Walker. Por favor, aguarde alguns instantes...',
};

import {WalkEvents} from '../../../enums/walk';
import {getWalkStatus, ownerCancelWalk} from '../../../services/walkService';
import {useDialog} from '../../../contexts/dialogContext';
import {AxiosError} from 'axios';
import {useAuth} from '../../../contexts/authContext';
import CustomButton from '../../../components/customButton';
import colors from '../../../styles/colors';

const THIRTY_SECONDS = 30000;

const shouldReturnHome = [
  WalkEvents.CANCELLED,
  WalkEvents.INVALID_REQUEST,
  WalkEvents.PAYMENT_FAILURE,
  WalkEvents.REQUEST_DENIED,
  WalkEvents.SERVER_ERROR,
];

export default function WalkStart() {
  const {user} = useAuth();
  const {route, navigation} = useAppNavigation();
  const {showDialog, hideDialog} = useDialog();

  const [message, setMessage] = useState(messages.default);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (user?.currentWalk?.requestId) {
      connectSocket(user?.currentWalk?.requestId);

      listenToEvent('walk', data => {
        setMessage(messages[data] || messages.default);

        if (data === WalkEvents.ACCEPTED_SUCCESSFULLY) {
          navigation.navigate('WalkInProgress', {
            requestId: user?.currentWalk?.requestId!,
          });
        }
        if (shouldReturnHome.includes(data)) {
          navigation.navigate('HomeScreen');
        }
      });

      return () => {
        disconnectSocket();
      };
    }
  }, []);

  const getStatus = async () => {
    if (!user?.currentWalk?.requestId) {
      return;
    }

    const now = new Date();
    if (lastUpdate && now.getTime() - lastUpdate.getTime() < THIRTY_SECONDS) {
      showDialog({
        title: 'Aguarde',
        description: 'Você só pode atualizar o status a cada 30 segundos.',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => hideDialog(),
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const status: WalkEvents = await getWalkStatus(
        user?.currentWalk?.requestId,
      );
      if (status) {
        setMessage(messages[status] || messages.default);

        if (status === WalkEvents.IN_PROGRESS) {
          navigation.navigate('WalkInProgress', {
            requestId: user?.currentWalk?.requestId,
          });
        }

        if (shouldReturnHome.includes(status)) {
          setIsLoading(false);
          navigation.navigate('HomeScreen');
        }

        setLastUpdate(now);
        setRemainingTime(THIRTY_SECONDS / 1000);
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError &&
        typeof error.response?.data?.data === 'string'
          ? error.response?.data?.data
          : 'Ocorreu um erro inesperado';

      showDialog({
        title: errorMessage,
        description: 'Tente novamente.',
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
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const intervalId = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime]);

  const handleCancel = () => {
    showDialog({
      title: 'Tem certeza',
      description: 'Você realmente deseja cancelar o passeio?',
      confirm: {
        confirmLabel: 'Não',
        onConfirm: () => {
          hideDialog();
        },
      },
      cancel: {
        cancelLabel: 'Sim',
        onCancel: async () => {
          await cancelWalk();
          hideDialog();
        },
      },
    });
  };

  const cancelWalk = async () => {
    setIsLoading(true);
    try {
      await ownerCancelWalk();
      navigation.navigate('HomeScreen');
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError &&
        typeof error.response?.data?.data === 'string'
          ? error.response?.data?.data
          : 'Ocorreu um erro inesperado';

      showDialog({
        title: errorMessage,
        description: 'Tente novamente.',
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
  };

  return (
    <View style={styles.container}>
      <Text className="text-dark text-2xl text-center font-semibold">
        {message}
      </Text>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          <View className="mt-5 w-full">
            <CustomButton
              label={`Atualizar status ${
                remainingTime > 0 ? `(${remainingTime}s)` : ''
              }`}
              onPress={getStatus}
              disabled={remainingTime > 0}
              backgroundColor={
                remainingTime > 0 ? colors.accent : colors.secondary
              }
            />
          </View>
          <View className="mt-5 w-full">
            <CustomButton
              label={'Cancelar passeio'}
              onPress={handleCancel}
              disabled={isLoading}
              backgroundColor={colors.primary}
            />
          </View>
        </>
      )}
    </View>
  );
}
