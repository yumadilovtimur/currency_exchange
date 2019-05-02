export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';
export const CURRENCY_SUCCESS = 'CURRENCY_SUCCESS';
export const CURRENCY_ERROR = 'CURRENCY_ERROR';

export const currencyRequest = payload => ({
  type: CURRENCY_REQUEST,
  payload
});

export const currencySuccess = payload => ({
  type: CURRENCY_SUCCESS,
  payload
});

export const currencyError = payload => ({
  type: CURRENCY_ERROR,
  payload
});
