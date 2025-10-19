import api from './BaseReq'

export const fetchBanks = async () => {
  try {
    const response = await api.get('/banks');
    return response.data;
  } catch (error) {
    console.error('Error with response');
    throw new Error("Failed with fetching banks");
  }
};