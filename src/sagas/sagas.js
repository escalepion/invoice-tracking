import { takeEvery, takeLatest, call, put, take } from "redux-saga/effects";
import { 
  signupApi, 
  signinApi, 
  fetchCurrentUserInfo, 
  createCategoryApi,
  createInvoiceApi,
  updateInvoiceApi,
  fetchCategoriesApi,
  deleteCategoryApi,
  createInvoiceFormFieldApi,
  deleteInvoiceFormFieldApi,
  fetchInvoicesApi
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
  CREATE_INVOICE,
  CREATE_INVOICE_SUCCESS,
  UPDATE_INVOICE,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_LOADING,
  CRETAE_CATEGORY_LOADING,
  CRETAE_INVOICE_LOADING,
  FETCH_CATEGORIES,
  SET_CATEGORIES,
  CATEGORIES_LOADING,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  CREATE_INVOICE_FORM_FIELD,
  DELETE_FIELD,
  FETCH_INVOICES,
  SET_INVOICES
} from './types';

import i18n from '../locale/i18n';

export function* rootSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
  yield takeLatest(SIGN_IN_REQUEST, signin);
  yield takeLatest(FETCH_CURRENT_USER_INFO, setCurrentUserInfo);
  yield takeLatest(CREATE_CATEGORY, createCategory);
  yield takeLatest(CREATE_INVOICE, createInvoice);
  yield takeLatest(UPDATE_INVOICE, updateInvoice);
  yield takeLatest(DELETE_CATEGORY, deleteCategory);
  yield takeLatest(CREATE_INVOICE_FORM_FIELD, createInvoiceFormField);
  yield takeLatest(DELETE_FIELD, deleteInvoiceFormField);
  yield takeEvery(FETCH_CATEGORIES, fetchCategories);
  yield takeEvery(FETCH_INVOICES, fetchInvoices);
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
  yield put({ type: CRETAE_CATEGORY_LOADING, payload: true });
  try {
    yield call(createCategoryApi, categoryName, uid);
    yield put({ type: CREATE_CATEGORY_SUCCESS, payload: true });
    yield put({ type: CRETAE_CATEGORY_LOADING, payload: false });
  }catch(error) {
    console.log(error);
    yield put({ type: CREATE_CATEGORY_SUCCESS, payload: false });
    yield put({ type: CRETAE_CATEGORY_LOADING, payload: false });
  }
}

function* createInvoiceFormField({ fieldType, fieldName, required, uid, categoryId }) {
  try {
    const createFormField = yield call(createInvoiceFormFieldApi, fieldType, fieldName, required, uid, categoryId);
    console.log('key : ', createFormField.key);
  }catch(error) {
    console.log(error);
  }
}

function* createInvoice({ values, uid, categoryId }) {
  yield put({ type: CRETAE_INVOICE_LOADING, payload: true });
  try {
    yield call(createInvoiceApi, values, uid, categoryId);
    yield put({ type: CREATE_INVOICE_SUCCESS, payload: true });
    yield put({ type: CRETAE_INVOICE_LOADING, payload: false });
  }catch(error) {
    console.log(error);
    yield put({ type: CREATE_INVOICE_SUCCESS, payload: false });
    yield put({ type: CRETAE_INVOICE_LOADING, payload: false });
  }
}

function* updateInvoice({ values, uid, categoryId, invoiceId }) {
  yield put({ type : UPDATE_INVOICE_SUCCESS, payload: true });
  try {
    yield call(updateInvoiceApi, values, uid, categoryId, invoiceId);
    yield put({ type : UPDATE_INVOICE_SUCCESS, payload: true });
    yield put({ type : UPDATE_INVOICE_LOADING, payload: false });
  }catch(error) {
    yield put({ type : UPDATE_INVOICE_SUCCESS, payload: false });
    yield put({ type : UPDATE_INVOICE_LOADING, payload: false });
  }
}

function* deleteCategory({ uid, categoryId }) {
  try {
    yield call(deleteCategoryApi, uid, categoryId);
    yield put({ type: DELETE_CATEGORY_SUCCESS, payload: true });
  }catch(error) {
    console.log(error);
    yield put({ type: DELETE_CATEGORY_SUCCESS, payload: false });
  }
}

function* deleteInvoiceFormField({ uid, categoryId, fieldId }) {
  try {
    yield call(deleteInvoiceFormFieldApi, uid, categoryId, fieldId);
  }catch(error) {
    console.log(error);
  }
}

function* fetchCategories({ uid }) {
    const updateCategories = fetchCategoriesApi(uid);
    while(true){
    let categories = yield take(updateCategories);
    const categoryList = categories.categories;
    let arr;
    if(categoryList === null) {
      arr = [];
    }else {
      arr = Object.keys(categoryList).map((key) => {
        return {id: key, categoryName: categoryList[key].categoryName, formTemplate: categoryList[key].formTemplate };
      });
    }
    yield put({ type: SET_CATEGORIES, payload: arr});
    yield put({ type: CATEGORIES_LOADING, payload: false });
    }
}

function* fetchInvoices({ uid, categoryId }) {
  const fetchInvoices = fetchInvoicesApi(uid, categoryId)
  while(true) {
  let invoices = yield take(fetchInvoices);
  const invoiceList = invoices.invoices;
  let arr;
  if (invoiceList === null) {
    arr = [];
  }else {
    arr = Object.keys(invoiceList).map((key) => {
      return {id: key, fields: invoiceList[key]};
    });
  }
  yield put({ type: SET_INVOICES, payload: arr});
  }
}



