import api from './BaseReq'

export const postTransaction = async (
  transactionId, currency, type, amount
) => {
  try {
    const response = await api.post(
        '/pay',
        {
            "transactionId": transactionId,
            "currency": currency,
            "type":  type,
            "amount": amount
        }, 
        {},
    );
    return response.data;
  } catch (error) {
      console.error('Failed with transaction request:', error);
    throw error;
  }
};