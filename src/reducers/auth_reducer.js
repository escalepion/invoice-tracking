import {
  SIGN_UP_LOADING,
  SIGN_IN_LOADING,
  SET_CURRENT_USER_INFO
} from '../sagas/types';

const INITIAL_STATE = {
  signupLoading: false,
  signinLoading: false,
  currentUser: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
      case SIGN_UP_LOADING:
        return { ...state, signupLoading: action.payload };
      case SIGN_IN_LOADING:
        return { ...state, signinLoading: action.payload };
      case SET_CURRENT_USER_INFO:
        return { ...state, currentUser: action.payload };
      default:
       return state;
  }
}  
