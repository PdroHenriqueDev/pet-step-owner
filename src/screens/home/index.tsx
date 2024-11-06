import React, {useCallback, useEffect, useState} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import InputAddress from './inputAddress';
import DogsList from './dogsList';
import DogWalkerList from './dogWalkersList';
import CustomButton from '../../components/customButton';
import {useDialog} from '../../contexts/dialogContext';
import {useRequest} from '../../contexts/requestContext';
import {useFocusEffect, useNavigationState} from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import {getLocationData} from '../../services/map';
import {PlataformEnum} from '../../enums/platform.enum';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';
import {WalkEvents} from '../../enums/walk';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import messaging from '@react-native-firebase/messaging';
import {useAuth} from '../../contexts/authContext';

function Home() {
  const {user, refreshUserData} = useAuth();
  const {showDialog, hideDialog} = useDialog();
  const {
    selectedDogIds,
    receivedLocation,
    onLocationReceived,
    selectedDogWalkerId,
    cleanSelectedDogWalker,
  } = useRequest();
  const [isLoading, setIsLoading] = useState(false);

  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  const {navigation} = useAppNavigation();

  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus | null>(null);

  useFocusEffect(
    useCallback(() => {
      refreshUserData();
    }, [refreshUserData]),
  );

  const handleClick = () => {
    if (!user?.defaultPayment) {
      showDialog({
        title: 'É preciso selecionar um meio de pagamento',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

    if (!receivedLocation) {
      showDialog({
        title: 'É preciso selecionar o início do passeio',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

    if (selectedDogIds.length === 0 || selectedDogIds.length > 4) {
      showDialog({
        title:
          selectedDogIds.length === 0
            ? 'É preciso no mínimo 1 dog'
            : 'Só é permitido no máximo 4 dogs',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

    if (selectedDogWalkerId) {
      cleanSelectedDogWalker();
    }

    navigation.navigate('WalkRequest');
  };

  const handleWalk = () => {
    const {requestId} = user?.currentWalk ?? {};
    if (requestId) {
      user?.currentWalk?.status === WalkEvents.IN_PROGRESS
        ? navigation.navigate('WalkInProgress', {requestId})
        : navigation.navigate('WalkStart', {requestId});
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     setIsLoading(true);
  //     const fetchOwner = async () => {
  //       if (!user) {
  //         return;
  //       }
  //       try {
  //         const ownerData = await getOwner(user._id!);
  //         setOwner(ownerData);
  //       } catch (error) {
  //         console.log('Failed to fetch owner data:', error);
  //         const errorMessage =
  //           error instanceof AxiosError &&
  //           typeof error.response?.data?.data === 'string'
  //             ? error.response?.data?.data
  //             : 'Ocorreu um erro inesperado';

  //         showDialog({
  //           title: errorMessage,
  //           confirm: {
  //             confirmLabel: 'Entendi',
  //             onConfirm: () => {
  //               hideDialog();
  //             },
  //           },
  //         });
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchOwner();
  //   }, [hideDialog, setOwner, showDialog]),
  // );

  useEffect(() => {
    const showLocationPermissionDeniedDialog = () => {
      showDialog({
        title: 'Permissão de localização necessária',
        description:
          'A permissão de localização é necessária para que a aplicação funcione corretamente. Por favor, habilite-a nas configurações.',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
    };

    const getLocationAndUpdateRegion = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });

        const {latitude, longitude} = location;

        const locationData = await getLocationData({latitude, longitude});
        const description = locationData?.results[0]?.formatted_address;

        onLocationReceived({
          latitude,
          longitude,
          description,
        });
      } catch {
        console.warn('Error ao localizar');
      }
    };

    const requestLocationPermission = async () => {
      const requestResponse = await request(
        Platform.OS === PlataformEnum.IOS
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      );

      setLocationPermission(requestResponse);

      locationPermission === 'denied'
        ? showLocationPermissionDeniedDialog()
        : await getLocationAndUpdateRegion();
    };

    if (locationPermission === null) {
      requestLocationPermission();
    }
  }, [hideDialog, locationPermission, onLocationReceived, showDialog]);

  useEffect(() => {
    handleWalk();
  }, []);

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      const chatId = remoteMessage?.data?.chatId as string;

      if (chatId && currentRouteName !== 'Chat') {
        showDialog({
          title: 'Nova mensagem',
          description: remoteMessage?.notification?.body,
          confirm: {
            confirmLabel: 'Ir para o chat',
            onConfirm: () => {
              navigation.navigate('Chat', {
                requestId: user?.currentWalk?.requestId,
              });
              hideDialog();
            },
          },
          cancel: {
            cancelLabel: 'Fechar',
            onCancel: () => {
              hideDialog();
            },
          },
        });
      }
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, [
    currentRouteName,
    hideDialog,
    navigation,
    showDialog,
    user?.currentWalk?.requestId,
  ]);

  const addDogs = () => {
    navigation.navigate('AddDogs');
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      {user?.dogs ? (
        <View style={styles.container}>
          <View style={styles.requestContainer}>
            {user?.currentWalk ? (
              <>
                <Text>O passeio do seu Dog</Text>
                <CustomButton
                  onPress={handleWalk}
                  label="Acompanhe o passeio"
                />
              </>
            ) : (
              <>
                <InputAddress />
                <DogsList />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    onPress={handleClick}
                    label="Solicitar passeio"
                  />
                </View>
              </>
            )}
          </View>
          <DogWalkerList />
        </View>
      ) : (
        <View className="p-5">
          <Text className="text-dark text-center text-2xl font-bold mb-5">
            Você precisa adicioner seus Dogs antes de solicitar um passeio.
          </Text>

          <CustomButton label={'Adicionar meus Dogs'} onPress={addDogs} />
        </View>
      )}
    </ScrollView>
  );
}

export default Home;
