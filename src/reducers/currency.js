import {
  CURRENCY_REQUEST,
  CURRENCY_SUCCESS,
  CURRENCY_ERROR
} from '../actions/currency';

import EURlogo from '../assets/flags/EUR.jpg';
import GBPlogo from '../assets/flags/GBP.png';
import USDlogo from '../assets/flags/USD.jpg';
import CHFlogo from '../assets/flags/CHF.png';
import JPYlogo from '../assets/flags/JPY.png';
import RUBlogo from '../assets/flags/RUB.png';

const currencies = [
  {
    code: 'EUR',
    name: 'Евро',
    mark: '€',
    logotype: EURlogo,
    rate: null,
    balance:
      localStorage.getItem('EUR') || localStorage.setItem('EUR', '100') || 100
  },
  {
    code: 'GBP',
    name: 'Фунт стрелингов',
    mark: '£',
    logotype: GBPlogo,
    rate: null,
    balance:
      localStorage.getItem('GBP') || localStorage.setItem('GBP', '100') || 100
  },
  {
    code: 'USD',
    name: 'Доллар',
    mark: '$',
    logotype: USDlogo,
    rate: null,
    balance:
      localStorage.getItem('USD') || localStorage.setItem('USD', '100') || 100
  },
  {
    code: 'CHF',
    name: 'Франк',
    mark: '₣',
    logotype: CHFlogo,
    rate: null,
    balance:
      localStorage.getItem('CHF') || localStorage.setItem('CHF', '100') || 100
  },
  {
    code: 'JPY',
    name: 'Иена',
    mark: '¥',
    logotype: JPYlogo,
    rate: null,
    balance:
      localStorage.getItem('JPY') || localStorage.setItem('JPY', '100') || 100
  },
  {
    code: 'RUB',
    name: 'Рубль',
    mark: '₽',
    logotype: RUBlogo,
    rate: null,
    balance:
      localStorage.getItem('RUB') || localStorage.setItem('RUB', '100') || 100
  }
];

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  currencies: currencies
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
        currencies: action.payload
      };
    case CURRENCY_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        error: action.payload,
        currencies: null
      };
    default:
      return state;
  }
};

export default currency;
