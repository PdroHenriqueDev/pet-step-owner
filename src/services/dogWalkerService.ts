import api from './api';
import {DogWalker} from '../interfaces/dogWalker';
import {CoordinatesProps} from '../interfaces/coordinates';
import {Location} from '../interfaces/location';
import {CostDataProps} from '../interfaces/costData';

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

export const getRecommedDogWalkers = async ({
  longitude,
  latitude,
}: CoordinatesProps): Promise<DogWalker[]> => {
  try {
    const response = await api.get<DogWalker[]>(
      `/dog-walker/recommed?longitude=${longitude}&latitude=${latitude}`,
    );
    const {data} = response;
    return data;
  } catch (error) {
    console.error('Error fetching dog walkers:', error);
    throw error;
  }
};

export const getNearestsDogWalkers = async ({
  longitude,
  latitude,
}: CoordinatesProps): Promise<DogWalker[]> => {
  try {
    const response = await api.get<DogWalker[]>(
      `/dog-walker/nearest?longitude=${longitude}&latitude=${latitude}`,
    );
    const {data} = response;
    return data;
  } catch (error) {
    console.error('Error fetching dog walkers:', error);
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

export const calculateCost = async ({
  ownerId,
  dogWalkerId,
  numberOfDogs,
  walkDurationMinutes,
  receivedLocation,
}: {
  ownerId: string;
  dogWalkerId: string;
  numberOfDogs: number;
  walkDurationMinutes: number;
  receivedLocation: Location;
}): Promise<CostDataProps> => {
  try {
    const response = await api.post<CostDataProps>(
      '/dog-walker/calculate-cost',
      {
        ownerId,
        dogWalkerId,
        numberOfDogs,
        walkDurationMinutes,
        receivedLocation,
      },
    );
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const requestWalk = async (calculationId: string): Promise<any> => {
  try {
    const response = await api.post(
      `/dog-walker/request-ride/${calculationId}`,
    );
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};
