import { combineReducers } from 'redux';
import auth from './auth';
import topics from './topics';
import employees from './employees';

export default combineReducers({
  auth,
  topics,
  employees,
});
