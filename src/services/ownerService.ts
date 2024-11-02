import api from './api';
import {Owner} from '../interfaces/owner';
import {CreditCardProps, PaymentMethodProps} from '../interfaces/payment';

export const registerOwner = async (owner: Owner): Promise<any> => {
  try {
    const response = await api.post('/owner', owner);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};

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
): Promise<PaymentMethodProps[]> => {
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

export const searchBreeds = async (term: string): Promise<any> => {
  try {
    const response = await api.get(`/owner/dogs-breeds/search?query=${term}`);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};
