import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';
import register from './register';
import changePassword from './changePassword';

export default combineReducers({
  auth, invite, register, changePassword,
});
