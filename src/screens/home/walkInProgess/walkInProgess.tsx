import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
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

export default function WalkInProgress() {
  const {route, navigation} = useAppNavigation();
  const {requestId} = route.params ?? {};

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

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <Text style={styles.infomessage}>
        Conectando ao Dog Walker. Por favor, aguarde alguns instantes.
      </Text>
      <Spinner />
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
