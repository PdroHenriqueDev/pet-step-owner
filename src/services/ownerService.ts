import api from './api';
import {Owner} from '../interfaces/owner';
import {CreditCardProps, PaymentMethodProps} from '../interfaces/payment';
import {UploadableFile} from '../interfaces/document';

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

export const getPaymentsMethods = async (): Promise<PaymentMethodProps[]> => {
  try {
    const response = await api.get<any>(`/owner/payment`);
    const {data} = response.data;
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

export const addDog = async (dog: Dog): Promise<any> => {
  try {
    const response = await api.post('/owner/dog', dog);
    const {data} = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentIntent = async (): Promise<any> => {
  try {
    const response = await api.get('/owner/payment/set-up-intent');
    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  field: string,
  newValue: any,
): Promise<any> => {
  try {
    const response = await api.put('/owner/update', {
      field,
      newValue,
    });

    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfileImage = async (
  documentFile: UploadableFile,
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('profile', documentFile);

    const response = await api.post('/owner/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
