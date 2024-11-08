import api from './api';
import {CostDataProps} from '../interfaces/costData';
import {Location} from '../interfaces/location';

export const calculateCost = async ({
  ownerId,
  dogWalkerId,
  dogs,
  walkDurationMinutes,
  receivedLocation,
}: {
  ownerId: string;
  dogWalkerId: string;
  dogs: string[];
  walkDurationMinutes: number;
  receivedLocation: Location;
}): Promise<CostDataProps> => {
  try {
    const response = await api.post('/walk/calculate-cost', {
      ownerId,
      dogWalkerId,
      dogs,
      walkDurationMinutes,
      receivedLocation,
    });
    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const requestWalk = async (calculationId: string): Promise<any> => {
  try {
    const response = await api.post(`/walk/request/${calculationId}`);
    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const walkById = async (requestId: string): Promise<any> => {
  try {
    const response = await api.get(`/walk/${requestId}`);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const listWalks = async (ownerId: string, page = 1): Promise<any> => {
  try {
    const response = await api.get(`/walk/list/${ownerId}?page=${page}`);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getWalkStatus = async (requestId: string): Promise<any> => {
  try {
    const response = await api.get(`/walk/status/${requestId}`);
    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const ownerCancelWalk = async (): Promise<any> => {
  try {
    const response = await api.delete('/walk/owner/cancel');
    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
