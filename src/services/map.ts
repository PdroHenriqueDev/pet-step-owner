import {CoordinatesProps} from '../interfaces/coordinates';
import api from './api';
import {LocationDataResponse} from '../interfaces/map';
import Config from 'react-native-config';

export const getLocationData = async ({
  longitude,
  latitude,
}: CoordinatesProps): Promise<LocationDataResponse> => {
  try {
    const response = await api.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`,
    );
    const {data} = response;
    return data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw new Error('Error ao buscar informações da localização');
  }
};
