import { takeLatest, call, put } from "redux-saga/effects";
import { signupApi } from '../services';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_LOADING
} from './types';

export function* rootSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* signup({email, password, username, language}) {
  yield put({ type: SIGN_UP_LOADING, payload: true });
  try {
    yield call(signupApi, email, password, username, language);
    yield put({ type: SIGN_UP_LOADING, payload: false });
  
  } catch (error) {
    yield put({ type: SIGN_UP_LOADING, payload: false });
  }
}
