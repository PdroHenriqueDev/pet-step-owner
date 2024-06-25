import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env';
import styles from './styles';
import {useLocation} from '../../../../contexts/locationContext';
import {Location} from '../../../../interfaces/location';
import colors from '../../../../styles/colors';
import CustomButton from '../../../../components/customButton';
import {truncateText} from '../../../../utils/textUtils';

function LocationBottomSheet({onLocationSelected, onConfirmLocation}: any) {
  const {receivedLocation, onLocationReceived} = useLocation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null);

  const [showInputPlaces, setShowInputPlaces] = useState(true);

  const handleSheetChanges = useCallback((index: number) => {
    setShowInputPlaces(index !== 0);
  }, []);

  const snapPoints = useMemo(() => [140, '85%'], []);

  const handleLocation = (
    data: GooglePlaceData,
    detail: GooglePlaceDetail | null,
  ) => {
    const {description} = data;
    if (detail) {
      const {geometry} = detail;
      const location: Location = {
        description,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
      };

      onLocationSelected(location);
      onLocationReceived(location);
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  const handleEdit = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  useEffect(() => {
    if (showInputPlaces) {
      setTimeout(() => {
        googlePlacesRef.current?.focus();
      }, 500);
    }
  }, [showInputPlaces]);

  const confirmLocation = () => {
    onConfirmLocation();
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={1}
        style={styles.bottomSheet}>
        <BottomSheetView style={styles.contentContainer}>
          {showInputPlaces && (
            <View style={{flex: 1, width: '100%'}}>
              <GooglePlacesAutocomplete
                ref={googlePlacesRef}
                placeholder="Digite o endereço do inicio do passeio"
                currentLocationLabel="Lugares perto de você"
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
                    color: colors.dark,
                  },
                  textInput: {
                    color: colors.dark,
                  },
                }}
                inbetweenCompo={
                  <TouchableOpacity
                    onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
                    <Text style={{marginLeft: 12}}>Selecionar no mapa</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}
          {!showInputPlaces && (
            <View style={styles.buttonContainer}>
              <View className="flex-row justify-between p-4 items-center">
                <Text style={styles.location}>
                  {truncateText({
                    text: receivedLocation?.description || '',
                    maxLength: 40,
                  })}
                </Text>

                <TouchableOpacity
                  onPress={handleEdit}
                  style={styles.editContainer}>
                  <Text>editar</Text>
                </TouchableOpacity>
              </View>
              <CustomButton
                onPress={confirmLocation}
                label="Confirmar Localização"
              />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default LocationBottomSheet;
