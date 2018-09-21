import { takeLatest, call, put } from "redux-saga/effects";
import { signupApi, signinApi } from '../services';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_LOADING,
  SIGN_IN_REQUEST,
  SIGN_IN_LOADING
} from './types';

export function* rootSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
  yield takeLatest(SIGN_IN_REQUEST, signin);
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

function* signin({email, password }) {
  yield put({ type: SIGN_IN_LOADING, payload: true });
  try {
    yield call(signinApi, email, password);
    yield put({ type: SIGN_IN_LOADING, payload: false });
  
  } catch (error) {
    yield put({ type: SIGN_IN_LOADING, payload: false });
  }
}
