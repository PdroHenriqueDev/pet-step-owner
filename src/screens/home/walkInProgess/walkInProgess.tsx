import React, {useEffect, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './styles';
import colors from '../../../styles/colors';
import {Icon} from '@rneui/base';
import Spinner from '../../../components/spinner/spinner';
import globalStyles from '../../../styles/globalStyles';
import DogWalkerCard from '../../../components/dogWalkerCard';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import {
  connectSocket,
  disconnectSocket,
  listenToEvent,
  setComponentMounted,
} from '../../../services/socketService';
import {walkById} from '../../../services/walkService';
import {DogWalker} from '../../../interfaces/dogWalker';
import messaging from '@react-native-firebase/messaging';
import {ref, update} from 'firebase/database';
import {database} from '../../../../firebaseConfig';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDialog} from '../../../contexts/dialogContext';
import {useAuth} from '../../../contexts/authContext';
import {PlataformEnum} from '../../../enums/platform.enum';
import CustomButton from '../../../components/customButton';

export default function WalkInProgress() {
  const {user} = useAuth();
  const {route, navigation} = useAppNavigation();
  const {showDialog, hideDialog} = useDialog();
  const {requestId} = route.params ?? user?.currentWalk?.requestId;

  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingWalk, setIsFetchingWalk] = useState(true);
  const [region, setRegion] = useState({
    longitude: -23.5505,
    latitude: -46.6333,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [walkInformation, setWalkInformation] = useState<{
    dogWalker: DogWalker;
    durationMinutes: number;
  }>();

  const navigateToChat = () => {
    if (!requestId) {
      return;
    }

    if (walkInformation?.dogWalker) {
      navigation.navigate('Chat', {
        dogWalkerId: walkInformation.dogWalker._id,
        requestId,
      });
    }
  };

  useEffect(() => {
    if (requestId) {
      setComponentMounted(true);
      connectSocket(requestId);

      listenToEvent('dogWalkerLocation', data => {
        const {longitude, latitude} = data;

        if (longitude && latitude) {
          setRegion(prevRegion => ({
            ...prevRegion,
            longitude: longitude,
            latitude: latitude,
          }));
        }
        setIsLoading(false);
      });

      return () => {
        setComponentMounted(false);
        disconnectSocket();
      };
    }
  }, [requestId]);

  useEffect(() => {
    const updateNotificationToken = async () => {
      try {
        const storedTokensRaw = await EncryptedStorage.getItem(
          'notificationTokens',
        );
        const storedTokens = storedTokensRaw ? JSON.parse(storedTokensRaw) : [];

        if (storedTokens.length > 1) {
          storedTokens.shift();
        }

        const token = await messaging().getToken();

        const isAlreadyStored = storedTokens.includes(token);
        if (isAlreadyStored) {
          return;
        }

        const tokenRef = ref(database, `chats/${requestId}`);

        await update(tokenRef, {
          ownerToken: token,
        });

        storedTokens.push(token);
        await EncryptedStorage.setItem(
          'notificationTokens',
          JSON.stringify(storedTokens),
        );
      } catch (error) {
        console.log('Erro ao atualizar o token:', error);
      }
    };

    updateNotificationToken();
  }, [requestId]);

  useEffect(() => {
    const fetchWalkData = async () => {
      if (!requestId) {
        setIsFetchingWalk(false);
        return;
      }

      try {
        const walkData = await walkById(requestId);
        setWalkInformation(walkData);
      } catch (error) {
        console.error('Failed to fetch walk info:', error);
      } finally {
        setIsFetchingWalk(false);
      }
    };

    fetchWalkData();
  }, [requestId]);

  useEffect(() => {
    const checkAndShowDialog = async () => {
      if (isLoading || !requestId) {
        return;
      }
      const storedRequestsRaw = await EncryptedStorage.getItem(
        'modalShownRequests',
      );
      const storedRequests = storedRequestsRaw
        ? JSON.parse(storedRequestsRaw)
        : [];
      if (storedRequests.length > 1) {
        storedRequests.shift();
      }

      const isAlreadyShown = storedRequests.includes(requestId);
      if (!isAlreadyShown) {
        showDialog({
          title: 'Atenção!',
          description:
            'Alguns dispositivos podem não atualizar a localização em tempo real quando o aplicativo está em segundo plano. Isso significa que a localização do dog walker pode não ser exibida imediatamente enquanto ele não estiver com o aplicativo aberto. A localização será atualizada assim que o dog walker voltar a usá-lo.',
          confirm: {
            confirmLabel: 'Entendi',
            onConfirm: async () => {
              storedRequests.push(requestId);
              await EncryptedStorage.setItem(
                'modalShownRequests',
                JSON.stringify(storedRequests),
              );
              hideDialog();
            },
          },
        });
      }
    };

    checkAndShowDialog();
  }, [hideDialog, showDialog, requestId, isLoading]);

  return isLoading ? (
    <View
      className={`bg-primary flex-1 ${
        Platform.OS === PlataformEnum.IOS ? 'px-5 py-40' : 'px-5 py-20'
      }`}>
      <Text className="text-dark text-center font-semibold text-2xl">
        O Dog Walker está a caminho! Prepare seu cão para o passeio, com coleira
        e focinheira (se necessário) e tudo mais que ele precisar para um
        passeio agradável 🐾
      </Text>

      <View className="mt-5">
        <CustomButton
          label={'Conversar com o Dog Walker'}
          onPress={navigateToChat}
        />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        scrollEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        showsUserLocation={false}>
        <Marker coordinate={region}>
          <Icon
            type="font-awesome-5"
            name="dog"
            size={30}
            color={colors.dark}
          />
        </Marker>
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={globalStyles.label}>Dog Walker em rota...</Text>
        {isFetchingWalk ? (
          <View style={styles.spinnerContainer}>
            <Spinner />
          </View>
        ) : (
          <>
            <View className="mt-4">
              <DogWalkerCard
                dogWalker={walkInformation?.dogWalker!}
                isSelected={false}
                isChat={true}
                buttonInfo={{
                  title: 'Conversar',
                  icon: <Icon type="material" name="message" size={14} />,
                }}
                onPress={navigateToChat}
              />
            </View>
            <View className="flex-row items-center">
              <Text style={globalStyles.label}>Tempo do passeio:</Text>
              <Text style={styles.time}>
                {' '}
                {walkInformation?.durationMinutes}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
