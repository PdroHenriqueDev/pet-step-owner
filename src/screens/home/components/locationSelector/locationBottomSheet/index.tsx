import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import globalStyles from '../../../../../styles/globalStyles';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef, Place } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import styles from './styles';
import { Location } from '../../../../../interfaces/location';

function LocationBottomSheet({ onLocationReceived, onConfirmLocation }: any) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null);
  
  const [showInputPlaces, setShowInputPlaces] = useState(true);

  const handleSheetChanges = useCallback((index: number) => {
    setShowInputPlaces(index !== 0);
  }, []);

  const snapPoints = useMemo(() => ['10%', '95%'], []);

  const handleLocation = (data: GooglePlaceData, detail: GooglePlaceDetail) => {
    const { description }  = data;
    const { geometry }  = detail;

    const location: Location = {
      description,
      latitude: geometry.location.lat,
      longitude: geometry.location.lng,
    }

    onLocationReceived(location);
    bottomSheetRef.current?.snapToIndex(0);
  }

  useEffect(() => {
    if (showInputPlaces) {
      setTimeout(() => {
        googlePlacesRef.current?.focus();
      }, 500);
    }
  }, [showInputPlaces]);

  const confirmLocation = () => {
    onConfirmLocation();
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={1}
        style={styles.bottomSheet}
      >
      <BottomSheetView style={styles.contentContainer}>
          {
            showInputPlaces && 
            <View style={{flex: 1, width: '100%'}}>
              <GooglePlacesAutocomplete
                ref={googlePlacesRef}
                placeholder='Digite o endereço do inicio do passeio'
                currentLocationLabel='Lugares perto de você'
                debounce={1000}
                currentLocation={true}
                fetchDetails={true}
                keepResultsAfterBlur={true}
                enableHighAccuracyLocation={true}
                isRowScrollable={false}
                onPress={(data, detail) => handleLocation(data, detail)}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'pt-BR',
                }}
                styles={{
                  textInputContainer: {
                    // flex: 1,
                    color: '#000000',
                  }
                }}
              />
          </View>
        }
        {
          !showInputPlaces && 
          <View style={{ width: '90%'}}>
            <TouchableOpacity onPress={confirmLocation} style={{
              ...globalStyles.button,
              marginBottom: 20,
            }}>
              <Text style={globalStyles.buttonText}>Confirmar Localização</Text>
            </TouchableOpacity>
          </View>
        }
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default LocationBottomSheet;