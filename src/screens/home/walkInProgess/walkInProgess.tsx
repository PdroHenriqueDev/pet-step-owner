import React, {useEffect, useState} from 'react';
import {Alert, Platform, Text, View} from 'react-native';
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
import {getWalkStatus, walkById} from '../../../services/walkService';
import {DogWalker} from '../../../interfaces/dogWalker';
import messaging from '@react-native-firebase/messaging';
import {ref, update} from 'firebase/database';
import {database} from '../../../../firebaseConfig';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDialog} from '../../../contexts/dialogContext';
import {useAuth} from '../../../contexts/authContext';
import {PlataformEnum} from '../../../enums/platform.enum';
import CustomButton from '../../../components/customButton';
import {WalkEvents} from '../../../enums/walk';
import {AxiosError} from 'axios';
import {SocketResponse} from '../../../enums/socketResponse';

const shouldReturnHome = [
  WalkEvents.CANCELLED,
  WalkEvents.INVALID_REQUEST,
  WalkEvents.PAYMENT_FAILURE,
  WalkEvents.REQUEST_DENIED,
  WalkEvents.SERVER_ERROR,
];

export default function WalkInProgress() {
  const {user, handleSetUser} = useAuth();
  const {navigation} = useAppNavigation();
  const {showDialog, hideDialog} = useDialog();

  const [walkStarted, setWalkStarted] = useState(false);
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
    if (!user?.currentWalk?.requestId) {
      return;
    }

    if (walkInformation?.dogWalker) {
      navigation.navigate('Chat', {
        dogWalkerId: walkInformation.dogWalker._id,
        requestId: user?.currentWalk?.requestId,
      });
    }
  };

  useEffect(() => {
    if (user?.currentWalk?.requestId) {
      setComponentMounted(true);
      connectSocket(user?.currentWalk?.requestId);

      listenToEvent(SocketResponse.DogWalkerLocation, data => {
        const {longitude, latitude} = data;

        if (longitude && latitude) {
          setRegion(prevRegion => ({
            ...prevRegion,
            longitude: longitude,
            latitude: latitude,
          }));
        }
        setWalkStarted(true);
      });

      listenToEvent(SocketResponse.Walk, status => {
        if (status === WalkEvents.IN_PROGRESS) {
          setWalkStarted(true);
        }

        if (status === WalkEvents.COMPLETED) {
          handleSetUser({
            ...user,
            currentWalk: null,
          });
          navigation.navigate('HomeScreen');
        }
      });

      return () => {
        setComponentMounted(false);
        disconnectSocket();
      };
    }
  }, [user?.currentWalk?.requestId]);

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

        const tokenRef = ref(database, `chats/${user?.currentWalk?.requestId}`);

        await update(tokenRef, {
          ownerToken: token,
        });

        storedTokens.push(token);
        await EncryptedStorage.setItem(
          'notificationTokens',
          JSON.stringify(storedTokens),
        );
      } catch (error) {}
    };

    updateNotificationToken();
  }, [user?.currentWalk?.requestId]);

  useEffect(() => {
    const fetchWalkData = async () => {
      if (!user?.currentWalk?.requestId) {
        setIsFetchingWalk(false);
        return;
      }

      try {
        const walkData = await walkById(user?.currentWalk?.requestId);
        setWalkInformation(walkData);
      } catch (error) {
      } finally {
        setIsFetchingWalk(false);
      }
    };

    fetchWalkData();
  }, [user?.currentWalk?.requestId]);

  useEffect(() => {
    const checkAndShowDialog = async () => {
      if (!walkStarted || !user?.currentWalk?.requestId) {
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

      const isAlreadyShown = storedRequests.includes(
        user?.currentWalk?.requestId,
      );
      if (!isAlreadyShown) {
        Alert.alert(
          'Atenção!',
          'Alguns dispositivos podem não atualizar a localização em tempo real quando o aplicativo está em segundo plano. Isso significa que a localização do dog walker pode não ser exibida imediatamente enquanto ele não estiver com o aplicativo aberto. A localização será atualizada assim que o dog walker voltar a usá-lo.',
          [
            {
              text: 'Entendi',
              onPress: async () => {
                storedRequests.push(user?.currentWalk?.requestId);
                await EncryptedStorage.setItem(
                  'modalShownRequests',
                  JSON.stringify(storedRequests),
                );
              },
            },
          ],
          {cancelable: false},
        );
      }
    };

    checkAndShowDialog();
  }, [hideDialog, showDialog, user?.currentWalk?.requestId]);

  useEffect(() => {
    const getStatus = async () => {
      if (!user?.currentWalk?.requestId) {
        return;
      }
      try {
        const status: WalkEvents = await getWalkStatus(
          user?.currentWalk?.requestId,
        );
        if (status) {
          if (status === WalkEvents.IN_PROGRESS) {
            setWalkStarted(true);
          }

          if (shouldReturnHome.includes(status)) {
            navigation.navigate('HomeScreen');
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

    getStatus();
  }, []);

  return !walkStarted ? (
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
    <View className="flex-1 justify-end">
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
      <View
        className={`bg-primary border border-border ${
          Platform.OS === PlataformEnum.IOS ? 'px-4 pb-12 pt-4' : 'p-4'
        }`}>
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
            <View className="flex-row my-2">
              <Text className="text-base text-dark">Tempo do passeio: </Text>
              <Text className="text-base text-accent">
                {walkInformation?.durationMinutes} min
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
