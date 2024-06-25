import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {useLocation} from '../../../contexts/locationContext';
import {Location} from '../../../interfaces/location';
import colors from '../../../styles/colors';
import LocationBottomSheet from './locationBottomSheet';
import styles from './styles';
import {request, PERMISSIONS} from 'react-native-permissions';
import {PlataformEnum} from '../../../enums/platform.enum';
import GetLocation from 'react-native-get-location';

function LocationSelector() {
  const {receivedLocation, onLocationReceived} = useLocation();

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
      ]),
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
    const {latitude, longitude} = event;

    const location = {
      ...receivedLocation,
      longitude,
      latitude,
    };
    onLocationReceived(location);
  };

  const handleRegionChangeComplete = async (event: Region) => {
    const {longitude, latitude} = event;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();
      const formattedAddress = data.results[0].formatted_address;

      onLocationReceived({
        longitude,
        latitude,
        description: formattedAddress,
      });
    } catch {}

    stopAnimation();
  };

  const handleOnLocationReceived = (location: Location) => {
    const {latitude, longitude, description} = location;
    onLocationReceived(location);

    setRegion(prevRegion => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  };

  const onConfirmLocation = async () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const getLocationAndUpdateRegion = async () => {
      // if (isRequestingLocation) {
      //   return;
      // }

      // setIsRequestingLocation(true);
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });

        const {latitude, longitude} = location;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        };
        console.log('got here newRegion', newRegion);
        setRegion(newRegion);
      } catch (error) {
        console.warn(error);
      } finally {
        // setIsRequestingLocation(false);
      }
    };

    const requestLocationPermission = async () => {
      const requestResponse = await request(
        Platform.OS === PlataformEnum.IOS
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      );

      if (requestResponse === 'granted') {
        await getLocationAndUpdateRegion();
      }
    };

    requestLocationPermission();
  }, [region.latitudeDelta, region.longitudeDelta]);

  return (
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
        <Animated.View style={{transform: [{scale: animation}]}}>
          <Icon
            style={styles.marker}
            type="font-awesome-6"
            name="location-pin"
            size={40}
            color={colors.dark}
          />
        </Animated.View>
      </View>

      <LocationBottomSheet
        onLocationSelected={handleOnLocationReceived}
        onConfirmLocation={onConfirmLocation}
      />
    </View>
  );
}

export default LocationSelector;
