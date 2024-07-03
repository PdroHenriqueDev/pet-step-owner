import api from './api';
import {Owner} from '../interfaces/owner';

export const getOwner = async (ownerId: string): Promise<Owner> => {
  try {
    const response = await api.get<Owner>(`/owner/${ownerId}`);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};
