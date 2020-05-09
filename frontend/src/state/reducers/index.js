import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';

export default combineReducers({
  auth, invite,
});
