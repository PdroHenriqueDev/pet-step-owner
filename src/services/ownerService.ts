import api from './api';
import {Owner} from '../interfaces/owner';
import {CreditCardProps} from '../interfaces/payment';

export const getOwner = async (ownerId: string): Promise<Owner> => {
  try {
    const response = await api.get<Owner>(`/owner/${ownerId}`);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentsMethods = async (
  ownerId: string,
): Promise<CreditCardProps[]> => {
  try {
    const response = await api.get<any>(`/owner/payments/${ownerId}`);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateDefaultPaymentMethod = async ({
  ownerId,
  paymentMethodId,
}: {
  ownerId: string;
  paymentMethodId: string;
}): Promise<CreditCardProps[]> => {
  try {
    const response = await api.put<any>(`/owner/${ownerId}/defaultPayment`, {
      paymentMethodId,
    });
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};
