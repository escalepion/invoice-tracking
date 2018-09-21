import {
  SIGN_UP_LOADING,
  SIGN_IN_LOADING
} from '../sagas/types';

const INITIAL_STATE = {
  signupLoading: false,
  signinLoading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
      case SIGN_UP_LOADING:
        return { ...state, signupLoading: action.payload };
      case SIGN_IN_LOADING:
        return { ...state, signinLoading: action.payload };
      default:
       return state;
  }
}  