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
import ReviewComponent from '../../components/review/reviewComponent';

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
    if (user?.currentWalk?.requestId) {
      user?.currentWalk?.status === WalkEvents.IN_PROGRESS ||
      user?.currentWalk?.status === WalkEvents.ACCEPTED_SUCCESSFULLY
        ? navigation.navigate('WalkInProgress', {
            requestId: user?.currentWalk?.requestId,
          })
        : navigation.navigate('WalkStart', {
            requestId: user?.currentWalk?.requestId,
          });
    }
  };

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
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
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

  // {user?.currentWalk ? (
  //   <>
  // <View className="flex-1 items-center">
  //   <Text className="text-2xl font-bold text-dark mb-2 text-center">
  //     Seu Dog está em um passeio
  //   </Text>
  //   <CustomButton
  //     label={'Acompanhe o passei'}
  //     onPress={handleWalk}
  //   />
  // </View>
  //   </>
  // ) : (
  //   <>

  //   </>
  // )}

  if (user?.currentWalk) {
    return (
      <View className="flex-1 bg-primary items-center p-5">
        <Text className="text-2xl font-bold text-dark mb-4 text-center">
          O passeio do seu Dog
        </Text>
        <CustomButton label={'Acompanhe o passeio'} onPress={handleWalk} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollViewContainer}>
      {user?.pendingReview && <ReviewComponent />}
      {user?.dogs ? (
        <View style={styles.container}>
          <View style={styles.requestContainer}>
            <InputAddress />
            <DogsList />
            <View style={styles.buttonContainer}>
              <CustomButton onPress={handleClick} label="Solicitar passeio" />
            </View>
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
