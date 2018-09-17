import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './auth_reducer';

export default combineReducers({
    form,
    auth: AuthReducer
    });