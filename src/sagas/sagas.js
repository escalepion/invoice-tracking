import { takeLatest, call } from "redux-saga/effects";
import { signupApi } from '../services';

export function* rootSaga() {
  yield takeLatest("SIGN_UP_REQUEST", signup);
}

function* signup({email, password, username, language}) {
  try {
    const response = yield call(signupApi, email, password, username, language);
    const dog = response;

    console.log('signup succeed dog user: ' , dog.user);
    // yield put({ type: "API_CALL_SUCCESS", dog });
  
  } catch (error) {
    console.log('signup failed: ' ,error);
    // yield put({ type: "API_CALL_FAILURE", error });
  }
}
