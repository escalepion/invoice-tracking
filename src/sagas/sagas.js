import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import { 
  signupApi, 
  signinApi, 
  fetchCurrentUserInfo, 
  createCategoryApi,
  fetchCategoriesApi
 } from '../services';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_LOADING,
  SIGN_IN_REQUEST,
  SIGN_IN_LOADING,
  FETCH_CURRENT_USER_INFO,
  SET_CURRENT_USER_INFO,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  FETCH_CATEGORIES,
  SET_CATEGORIES,
  CATEGORIES_LOADING
} from './types';

import i18n from '../locale/i18n';

export function* rootSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
  yield takeLatest(SIGN_IN_REQUEST, signin);
  yield takeLatest(FETCH_CURRENT_USER_INFO, setCurrentUserInfo);
  yield takeLatest(CREATE_CATEGORY, createCategory);
  yield takeEvery(FETCH_CATEGORIES, fetchCategories);
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

function* createCategory({ categoryName, uid }) {
  try {
    yield call(createCategoryApi, categoryName, uid);
    yield put({ type: CREATE_CATEGORY_SUCCESS, payload: true });
  }catch(error) {
    console.log(error);
    yield put({ type: CREATE_CATEGORY_SUCCESS, payload: false });
  }
}

function* fetchCategories({ uid }) {
  console.log('fetch categories triggered');
  try {
    let categories = yield call(fetchCategoriesApi, uid);
    const arr = Object.keys(categories).map((key) => {
      return {uid: key, categoryName: categories[key].categoryName };
    });
    yield put({ type: SET_CATEGORIES, payload: arr});
    yield put({ type: CATEGORIES_LOADING, payload: false });
  }catch(error) {
    yield put({ type: CATEGORIES_LOADING, payload: false });
    console.log(error);
  }
}


