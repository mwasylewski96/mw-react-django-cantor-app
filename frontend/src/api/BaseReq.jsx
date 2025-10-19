import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    [process.env.REACT_APP_API_X_CURRENCY_TOKEN_HEADER_NAME]: process.env.REACT_APP_API_X_CURRENCY_TOKEN_HEADER_VALUE,
    'Content-Type': 'application/json',
  }
});
