import api from './api';

export const sendFeedback = async ({
  requestId,
  comment,
  rate,
  reviewedId,
}: {
  requestId: string;
  comment?: string;
  rate: number;
  reviewedId: string;
}): Promise<any> => {
  try {
    const response = await api.post('/feedback', {
      requestId,
      comment,
      rate,
      reviewedId,
    });

    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const clearPendingReview = async (): Promise<any> => {
  try {
    const response = await api.post('/feedback/remove');

    const {data} = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
