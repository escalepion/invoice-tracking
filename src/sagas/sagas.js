import { takeLatest, call, put } from "redux-saga/effects";
import { signupApi, signinApi, fetchCurrentUserInfo } from '../services';
import i18n from '../locale/i18n';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_LOADING,
  SIGN_IN_REQUEST,
  SIGN_IN_LOADING,
  FETCH_CURRENT_USER_INFO,
  SET_CURRENT_USER_INFO
} from './types';

export function* rootSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
  yield takeLatest(SIGN_IN_REQUEST, signin);
  yield takeLatest(FETCH_CURRENT_USER_INFO, setCurrentUserInfo);
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

function* setCurrentUserInfo({uid}) {
  try {
    const currentUser = yield call(fetchCurrentUserInfo, uid);
    i18n.changeLanguage(currentUser.language);
    yield put({ type: SET_CURRENT_USER_INFO, payload: currentUser });
  }catch(error) {
    console.log(error);
  }
}
