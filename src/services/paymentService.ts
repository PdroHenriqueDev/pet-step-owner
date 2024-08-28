import {SetUpIntentProps} from '../interfaces/payment';
import api from './api';

export const getSetupIntent = async (
  customerId: string,
): Promise<SetUpIntentProps> => {
  try {
    const response = await api.get<any>(
      `/payment/create-setup-intent/${customerId}`,
    );
    const {data} = response;
    return data;
  } catch (error) {
    console.error('Error set up intent', error);
    throw error;
  }
};

export const removePaymentMethod = async ({
  ownerId,
  paymentMethodId,
}: {
  ownerId: string;
  paymentMethodId: string;
}) => {
  try {
    const response = await api.delete<any>(
      `/payment/remove/${ownerId}/${paymentMethodId}`,
    );
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};
