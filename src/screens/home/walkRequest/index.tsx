import React from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useRequest} from '../../../contexts/requestContext';
import styles from './styles';
import {Icon} from '@rneui/base';
import colors from '../../../styles/colors';
import RequestBottomSheet from './requestBottomSheet';

function WalkRequest() {
  const {receivedLocation} = useRequest();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          longitude: receivedLocation?.longitude!,
          latitude: receivedLocation?.latitude!,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        showsUserLocation={true}
      />
      <View style={styles.markerFixed}>
        <Icon
          style={styles.marker}
          type="material"
          name="navigation"
          size={30}
          color={colors.dark}
        />
      </View>
      <View style={styles.bottomSheetContainer}>
        <RequestBottomSheet />
      </View>
    </View>
  );
}

export default WalkRequest;
