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

export default function WalkInProgress() {
  const {route} = useAppNavigation();
  const {requestId} = route.params ?? {};
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState({
    longitude: -23.5505,
    latitude: -46.6333,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    if (requestId) {
      setComponentMounted(true);
      connectSocket(requestId);

      listenToEvent('dog_walker_location', data => {
        const {longitude, latitude} = data;
        console.log('got first data =>', data);
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
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
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
        <View className="mt-4">
          <DogWalkerCard
            dogWalker={{
              _id: '',
              name: 'Pedro Henrique',
              rate: 5,
              profileUrl: '',
              isOnline: true,
            }}
            isSelected={false}
            buttonInfo={{
              title: 'Conversar',
              icon: <Icon type="material" name="message" size={14} />,
            }}
            onPress={() => {}}
          />
        </View>
        <View className="flex-row items-center">
          <Text style={globalStyles.label}>Tempo do passeio:</Text>
          <Text style={styles.time}> 20 min</Text>
        </View>
      </View>
    </View>
  );
}
