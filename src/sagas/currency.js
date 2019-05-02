import { put, call, take, delay } from 'redux-saga/effects';
import {
  currencySuccess,
  currencyError,
  CURRENCY_REQUEST
} from '../actions/currency';

const getData = () => {
  return fetch('https://api.exchangeratesapi.io/latest', {
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

const loadTemperature = currencyXml => {
  const real = currencyXml.querySelectorAll('TEMPERATURE');
  const perceived = currencyXml.querySelectorAll('HEAT');
  const phenomena = currencyXml.querySelectorAll('PHENOMENA');

  const result = {};

  const addData = (nodes, data, attr) => {
    [...nodes].forEach(item => {
      const value = item.getAttribute(attr);
      const hour = `${item.parentNode.getAttribute('hour')}:00`;
      result[hour] = {
        ...result[hour],
        [data]: value
      };
    });
  };

  addData(real, 'realTemperature', 'max');
  addData(perceived, 'perceivedTemperature', 'max');
  addData(phenomena, 'cloudiness', 'cloudiness');

  return result;
};

const buildChart = tempData => {
  const timeKeys = Object.keys(tempData);
  const realTemp = timeKeys.map(key => tempData[key].realTemperature);
  const perceivedTemp = timeKeys.map(key => tempData[key].perceivedTemperature);
};

export default function* currencyFlow() {
  while (true)
    try {
      yield take(CURRENCY_REQUEST);
      yield delay(1500);
      const data = yield call(getData);
      console.log(data);
      const temp = yield call(loadTemperature, data.response);
      console.log(temp);
      yield put(currencySuccess(temp));
      yield call(buildChart, temp);
    } catch (error) {
      yield put(currencyError(error));
    }
}
