import api from './BaseReq'

export const postTransaction = async (
  transactionId, currency, type, amount
) => {
  try {
    const response = await api.post(
        '/transaction',
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
       console.error('Error with response:', error.message, error.response.data.detail);
    throw error;
  }
};