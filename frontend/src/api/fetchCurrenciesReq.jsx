import api from './BaseReq'

export const fetchCurrencies = async () => {
  try {
    const response = await api.get('/currencies');
    return response.data;
  } catch (error) {
    console.error('Error with response:', error);
    throw error;
  }
};