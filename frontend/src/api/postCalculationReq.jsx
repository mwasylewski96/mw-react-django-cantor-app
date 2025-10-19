import api from './BaseReq'

export const postCalculationExchange = async (
  currency, type_rate, amount
) => {
  try {
    const response = await api.post(
        '/calculate',
        {
            "currency": currency,
            "type_rate": type_rate,
            "amount":  amount
        }, 
        {},
    );
    return response.data;
  } catch (error) {
      console.error('Error with response:', error.message, error.response.data.detail);
    throw new Error('Failed with calculation request. Check console for more info!');
  }
};