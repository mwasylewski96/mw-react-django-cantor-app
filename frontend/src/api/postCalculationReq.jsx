import api from './BaseReq'

export const postCalculationExchange = async (
  currency, type_rate, amount
) => {
  try {
    console.log("CURENCY: ", currency)
    console.log("TYPE_RATE: ", type_rate)
    console.log("AMOUNT: ", amount)
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
      console.error('Error with response:', error);
    throw new Error('Failed with calculation request. Check console for more info!');
  }
};