import React, {useCallback, useEffect, useState} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import InputAddress from './inputAddress';
import DogsList from './dogsList';
import DogWalkerList from './dogWalkersList';
import CustomButton from '../../components/customButton';
import {useDialog} from '../../contexts/dialogContext';
import {useRequest} from '../../contexts/requestContext';
import {useOwner} from '../../contexts/ownerContext';
import {getOwner} from '../../services/ownerService';
import {useFocusEffect} from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import {getLocationData} from '../../services/map';
import {PlataformEnum} from '../../enums/platform.enum';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';
import {RideEvents} from '../../enums/ride';
import {useAppNavigation} from '../../hooks/useAppNavigation';

function Home() {
  const {setOwner, owner} = useOwner();
  const {showDialog, hideDialog} = useDialog();
  const {selectedDogIds, receivedLocation, onLocationReceived} = useRequest();
  const [isLoading, setIsLoading] = useState(false);

  const {navigation} = useAppNavigation() as any;

  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus | null>(null);

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

    if (selectedDogIds.length === 0 || selectedDogIds.length > 3) {
      showDialog({
        title:
          selectedDogIds.length === 0
            ? 'É preciso no mínimo 1 dog'
            : 'Só é permitido no máximo 3 dogs',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

    navigation.navigate('WalkRequest');
  };

  const handleWalk = () => {
    const {requestId} = owner?.currentWalk ?? {};
    owner?.currentWalk.status === RideEvents.PENDING
      ? navigation.navigate('WalkStart', {requestId})
      : navigation.navigate('WalkInProgress', {requestId});
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const fetchOwner = async () => {
        try {
          const ownerData = await getOwner('66b29279044cd2eca1e22adf');
          setOwner(ownerData);
        } catch (error) {
          console.error('Failed to fetch owner data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOwner();
    }, [setOwner]),
  );

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

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.requestContainer}>
          {owner?.currentWalk ? (
            <>
              <Text>O passeio do seu Dog</Text>
              <CustomButton onPress={handleWalk} label="Acompanhe o passeio" />
            </>
          ) : (
            <>
              <InputAddress />
              <DogsList />
              <View style={styles.buttonContainer}>
                <CustomButton onPress={handleClick} label="Solicitar passeio" />
              </View>
            </>
          )}
        </View>
        <DogWalkerList />
      </View>
    </ScrollView>
  );
}

export default Home;
