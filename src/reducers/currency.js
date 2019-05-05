import {
  CURRENCY_REQUEST,
  CURRENCY_SUCCESS,
  CURRENCY_ERROR,
  CURRENCY_EXCHANGE
} from '../actions/currency';
import currencies from '../currencies';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  currencies: currencies
};

const getRates = data => {
  const newData = [...currencies].map(item => {
    if (item.code === 'EUR') {
      item.rate = 1;
    } else {
      item.rate = data[item.code];
    }
    return item;
  });

  return newData;
};

const exchange = (data, stateCurrencies) => {
  return stateCurrencies.map(item => {
    if (item.code === data.sold.code) {
      item.balance = data.sold.newBalance;
    } else if (item.code === data.purchased.code) {
      item.balance = data.purchased.newBalance;
    }
    return item;
  });
};

const currency = (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        error: null
      };
    case CURRENCY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        error: null,
        currencies: getRates(action.payload)
      };
    case CURRENCY_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        error: action.payload,
        currencies: null
      };
    case CURRENCY_EXCHANGE:
      return {
        ...state,
        currencies: exchange(action.payload, state.currencies)
      };
    default:
      return state;
  }
};

export default currency;
