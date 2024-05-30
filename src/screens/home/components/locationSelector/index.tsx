import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_MAPS_API_KEY } from '@env';
import colors from '../../../../styles/colors';
import styles from './styles';
import globalStyles from '../../../../styles/globalStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LocationBottomSheet from './locationBottomSheet';
import { Location } from '../../../../interfaces/location';

function LocationSelector() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [region, setRegion] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [receivedLocation, setReceivedLocation] = useState<Location>();
  const navigation = useNavigation() as any;

  const handleSelectLocation = async () => {
    if (!selectedLocation) return;
    const { latitude, longitude } = selectedLocation;

    setLoading(true);
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      console.log('got here', data.results[0].formatted_address)
      const formattedAddress = data.results[0].formatted_address;
      setAddress(formattedAddress);
      navigation.navigate('Home', { selectedLocation, address: formattedAddress });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (event: Region) => {
    const { latitude, longitude } = event;
    setSelectedLocation({ latitude, longitude })
  }

  const onLocationReceived = (location: Location) => {
    const { latitude, longitude } = location;
    setReceivedLocation(location);

    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  };

  const onConfirmLocation = () => {
    console.log('got here onConfirmLocation => ')
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChange={handleRegionChange}
          showsUserLocation={true}
        />
        <View style={styles.markerFixed}>
          <Icon
              style={styles.marker}
              type='font-awesome-6'
              name='location-pin'
              size={40}
              color={colors.primary}
          />
        </View>

        <LocationBottomSheet onLocationReceived={onLocationReceived} onConfirmLocation={onConfirmLocation}/>
      </View>
      </GestureHandlerRootView>
  );
};

export default LocationSelector;
