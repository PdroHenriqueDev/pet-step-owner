import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_MAPS_API_KEY } from '@env';
import colors from '../../../../styles/colors';
import styles from './styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LocationBottomSheet from './locationBottomSheet';
import { Location } from '../../../../interfaces/location';
import { useLocation } from '../../../../contexts/LocationContext';

function LocationSelector() {
  const { receivedLocation, onLocationReceived } = useLocation();

  const [region, setRegion] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation() as any;
  
  const animation = useRef(new Animated.Value(1)).current;
  const animationLoop = useRef<any>(null);

  const startAnimation = () => {
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
      ])
    ) as any;
    animationLoop.current.start();
  };

  const stopAnimation = () => {
    if (animationLoop.current) {
      animationLoop.current.stop();
      animation.setValue(1);
    }
  };

  const handleRegionChange = (event: Region) => {
    // stopAnimation();
    const { latitude, longitude } = event;
  
    const location = {
      ...receivedLocation,
      longitude,
      latitude,
    };
    onLocationReceived(location);
  }

  const handleRegionChangeComplete = async (event: Region) => {
    const { longitude, latitude } = event;
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      const formattedAddress = data.results[0].formatted_address;
      
      onLocationReceived({
        longitude,
        latitude,
        description: formattedAddress,
      });
    } catch {

    }
    
    stopAnimation();
  }

  const handleOnLocationReceived = (location: Location) => {
    const { latitude, longitude, description } = location;
    onLocationReceived(location);

    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  };

  const onConfirmLocation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${receivedLocation?.latitude},${receivedLocation?.longitude}&key=${GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      const formattedAddress = data.results[0].formatted_address;

      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChange={handleRegionChange}
          onRegionChangeComplete={handleRegionChangeComplete}
          onPanDrag={startAnimation}
          showsUserLocation={true}
        />
        <View style={styles.markerFixed}>
        <Animated.View style={{ transform: [{ scale: animation }] }}>
          <Icon
              style={styles.marker}
              type='font-awesome-6'
              name='location-pin'
              size={40}
              color={colors.primary}
          />
        </Animated.View>
        </View>

        <LocationBottomSheet onLocationSelected={handleOnLocationReceived}  onConfirmLocation={onConfirmLocation}/>
      </View>
      </GestureHandlerRootView>
  );
};

export default LocationSelector;
