import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';
import register from './register';

export default combineReducers({
  auth, invite, register,
});
