import currency from './currency';
import { call, all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([call(currency)]);
}

export default rootSaga;
