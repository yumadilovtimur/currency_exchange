import { put, call, take, delay } from 'redux-saga/effects';
import {
  currencyRequest,
  currencySuccess,
  currencyError,
  CURRENCY_REQUEST
} from '../actions/currency';
import currencies from '../currencies';

const getCodes = () => {
  const codesArray = currencies.map(item => item.code);
  codesArray.splice(codesArray.findIndex(item => item === 'EUR'), 1);
  return codesArray.join(',');
};

const getData = () => {
  return fetch(`/api.exchangeratesapi.io/latest?symbols=${getCodes()}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'application/json',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors'
  })
    .then(response => response.json())
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export default function* currencyFlow() {
  yield take(CURRENCY_REQUEST);
  while (true) {
    yield put(currencyRequest());
    try {
      yield delay(2500); // задержка для прелоадера
      const data = yield call(getData);
      yield put(currencySuccess(data.response.rates));
    } catch (error) {
      yield put(currencyError(error));
    }
    yield delay(3000000); // обновление котировок каждые 30 секунд
  }
}
