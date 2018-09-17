import {
  SIGN_UP_LOADING
} from '../sagas/types';

const INITIAL_STATE = {
  signupLoading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
      case SIGN_UP_LOADING:
        return { ...state, signupLoading: action.payload };
      default:
       return state;
  }
}  