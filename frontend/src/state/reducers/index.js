import { combineReducers } from 'redux';
import auth from './auth';
import apiAction from './apiAction';

export default combineReducers({
  auth,
  apiAction,
});
