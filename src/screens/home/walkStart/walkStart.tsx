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
import {WalkEvents} from '../../../enums/walk';

export default function WalkStart() {
  const {route, navigation} = useAppNavigation();
  const {requestId} = route.params ?? {};

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const messages: {[key: string]: string} = {
      [WalkEvents.PAYMENT_FAILURE]:
        'O pagamento não foi concluído. Verifique suas informações e tente novamente. Se o problema persistir, entre em contato com o suporte.',
      [WalkEvents.ACCEPTED_SUCCESSFULLY]: 'O passeio foi aceito com sucesso.',
      [WalkEvents.SERVER_ERROR]:
        'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
      [WalkEvents.INVALID_REQUEST]:
        'A solicitação é inválida. Por favor, verifique as informações e tente novamente.',
      default:
        'O passeio foi cancelado. Por favor, tente selecionar outro Dog Walker.',
    };

    if (requestId) {
      setIsLoading(true);
      connectSocket(requestId);

      listenToEvent('walk', data => {
        console.log('got here walk', data)
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

  const notificationMessage =
    message ||
    'Estamos notificando o Dog Walker. Por favor, aguarde alguns instantes';

  return (
    <View style={styles.container}>
      <Text style={styles.notificationMessage}>{notificationMessage}</Text>
      {isLoading && <Spinner />}
    </View>
  );
}
