import { takeLatest, call, put } from "redux-saga/effects";
import firebase from "firebase";

export function* rootSaga() {
  yield takeLatest("SIGN_UP_REQUEST", signup);
}

function signupApi(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password);
}

function* signup({email, password}) {
  try {
    const response = yield call(signupApi, email, password);
    const dog = response;

    console.log('signup succeed');
    // yield put({ type: "API_CALL_SUCCESS", dog });
  
  } catch (error) {
    // yield put({ type: "API_CALL_FAILURE", error });
  }
}
