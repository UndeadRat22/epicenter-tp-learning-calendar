import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';
import register from './register';
import topics from './topics';
import employees from './employees';

export default combineReducers({
  auth,
  invite,
  register,
  topics,
  employees,
});
