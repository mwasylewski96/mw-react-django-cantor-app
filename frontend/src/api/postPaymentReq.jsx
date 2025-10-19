import api from './BaseReq'

export const postPayment = async (
  amount, bank, id, password
) => {
  try {
    const response = await api.post(
        '/pay',
        {
            "amount": amount,
            "bank": bank,
            "id":  id,
            "password": password
        }, 
        {},
    );
    return response.data;
  } catch (error) {
       console.error('Error with response:', error.message, error.response.data.detail);
    throw error;
  }
};