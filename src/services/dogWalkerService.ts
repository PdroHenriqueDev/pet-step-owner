import api from './api';
import {DogWalker} from '../interfaces/dogWalker';
import {CoordinatesProps} from '../interfaces/coordinates';

export const getDogWalkers = async (): Promise<DogWalker[]> => {
  try {
    const response = await api.get<DogWalker[]>('/dogwalkers');
    const {data} = response;
    return data;
  } catch (error) {
    console.error('Error fetching dog walkers:', error);
    throw error;
  }
};

export const getRecommendedDogWalkers = async ({
  longitude,
  latitude,
}: CoordinatesProps): Promise<DogWalker[]> => {
  try {
    const response = await api.get(
      `/dog-walker/recommended?longitude=${longitude}&latitude=${latitude}`,
    );
    const {data} = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching dog walkers:', error);
    throw error;
  }
};

export const getNearestsDogWalkers = async ({
  longitude,
  latitude,
  limit = 10,
  skip = 0,
}: CoordinatesProps): Promise<DogWalker[]> => {
  try {
    const response = await api.get(
      `/dog-walker/nearest?longitude=${longitude}&latitude=${latitude}&limit=${limit}&skip=${skip}`,
    );
    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDogWalkerById = async (id: string): Promise<DogWalker> => {
  try {
    const response = await api.get<DogWalker>(`/dogwalkers/${id}`);
    const {data} = response;

    return data;
  } catch (error) {
    console.error(`Error fetching dog walker with id ${id}:`, error);
    throw error;
  }
};
