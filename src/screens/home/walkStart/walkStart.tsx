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
    'Estamos notificando o Dog Walker. Por favor, aguarde alguns instantes.',
};

import {WalkEvents} from '../../../enums/walk';
import {getWalkStatus} from '../../../services/walkService';
import {useDialog} from '../../../contexts/dialogContext';
import {AxiosError} from 'axios';

export default function WalkStart() {
  const {route, navigation} = useAppNavigation();
  const {showDialog, hideDialog} = useDialog();
  const {requestId} = route.params ?? {};

  const [message, setMessage] = useState(messages.default);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (requestId) {
      setIsLoading(true);
      connectSocket(requestId);

      listenToEvent('walk', data => {
        setMessage(messages[data] || messages.default);

        setIsLoading(false);

        if (data === WalkEvents.ACCEPTED_SUCCESSFULLY) {
          navigation.navigate('WalkInProgress', {requestId});
        }
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [navigation, requestId]);

  useEffect(() => {
    const getStatus = async () => {
      if (!requestId) {
        return;
      }
      try {
        const status: WalkEvents = await getWalkStatus(requestId);
        if (status) {
          setMessage(messages[status] || messages.default);

          if (status !== WalkEvents.ACCEPTED_SUCCESSFULLY) {
            setIsLoading(false);
          }

          if (status === WalkEvents.ACCEPTED_SUCCESSFULLY) {
            navigation.navigate('WalkInProgress', {requestId});
          }
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
      }
    };

    const intervalId = setInterval(getStatus, 30000);
    return () => clearInterval(intervalId);
  }, [hideDialog, navigation, requestId, showDialog]);

  return (
    <View style={styles.container}>
      <Text style={styles.notificationMessage}>{message}</Text>
      {isLoading && <Spinner />}
    </View>
  );
}
