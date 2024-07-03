import api from './api';
import {DogWalker} from '../interfaces/dogWalker';

export const getDogWalkers = async (): Promise<DogWalker[]> => {
  try {
    const response = await api.get<DogWalker[]>('/dogwalkers');
    return response.data;
  } catch (error) {
    console.error('Error fetching dog walkers:', error);
    throw error;
  }
};

export const getNearestsDogWalkers = async (): Promise<DogWalker[]> => {
  try {
    const response = await api.get<DogWalker[]>('/dog-walker/nearest');
    console.log('response =>', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching dog walkers:', error);
    throw error;
  }
};

export const getDogWalkerById = async (id: string): Promise<DogWalker> => {
  try {
    const response = await api.get<DogWalker>(`/dogwalkers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching dog walker with id ${id}:`, error);
    throw error;
  }
};

export const updateDogWalkerStatus = async (
  id: string,
  status: boolean,
): Promise<void> => {
  try {
    await api.put(`/dogwalkers/${id}/status`, {status});
  } catch (error) {
    console.error(`Error updating dog walker status with id ${id}:`, error);
    throw error;
  }
};
