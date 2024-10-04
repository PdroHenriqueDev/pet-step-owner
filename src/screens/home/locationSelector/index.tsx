import React, {useCallback, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {useRequest} from '../../../contexts/requestContext';
import {Location} from '../../../interfaces/location';
import LocationBottomSheet from './locationBottomSheet';
import styles from './styles';
import Marker from '../../../components/marker';
import {getLocationData} from '../../../services/map';
import {debounce} from '../../../utils/debounce';

function LocationSelector() {
  const {receivedLocation, onLocationReceived} = useRequest();

  const [region, setRegion] = useState({
    latitude: receivedLocation?.latitude ?? -23.5505,
    longitude: receivedLocation?.longitude ?? -46.6333,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation() as any;

  const animation = useRef(new Animated.Value(1)).current;
  const animationLoop = useRef<any>(null);

  const startAnimation = useCallback(() => {
    animationLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ) as any;
    animationLoop.current.start();
  }, [animation]);

  const stopAnimation = useCallback(() => {
    if (animationLoop.current) {
      animationLoop.current.stop();
      animation.setValue(1);
    }
  }, [animation]);

  const handleRegionChangeComplete = debounce(async (event: Region) => {
    stopAnimation();
    setIsLoading(true);

    const {longitude, latitude} = event;
    try {
      const locationData = await getLocationData({latitude, longitude});

      const description = locationData.results[0].formatted_address;

      onLocationReceived({
        longitude,
        latitude,
        description,
      });
    } catch {
      console.warn('Error ao localizar');
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const handleOnLocationReceived = (location: Location) => {
    const {latitude, longitude} = location;
    onLocationReceived(location);

    setRegion(prevRegion => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  };

  const onConfirmLocation = async () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPanDrag={startAnimation}
        showsUserLocation={true}
        scrollEnabled={true}
      />
      <Marker />

      <LocationBottomSheet
        onLocationSelected={handleOnLocationReceived}
        onConfirmLocation={onConfirmLocation}
        isLoading={isLoading}
      />
    </View>
  );
}

export default LocationSelector;
