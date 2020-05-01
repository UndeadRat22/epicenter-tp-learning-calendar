import { combineReducers } from 'redux';
import auth from './auth';
import apiAction from './action';

export default combineReducers({
  auth,
  apiAction,
});
