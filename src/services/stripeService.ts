import {SetUpIntentProps} from '../interfaces/payment';
import api from './api';

export const getSetupIntent = async (
  customerId: string,
): Promise<SetUpIntentProps> => {
  try {
    const response = await api.get<any>(
      `/stripe/create-setup-intent/${customerId}`,
    );
    const {data} = response;
    return data;
  } catch (error) {
    console.error('Error set up intent', error);
    throw error;
  }
};
