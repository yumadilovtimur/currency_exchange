import currencyFlow from './currency';
import { call, all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([call(currencyFlow)]);
}

export default rootSaga;
