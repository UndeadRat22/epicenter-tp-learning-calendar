import { combineReducers } from 'redux';
import { loginStatusReducer } from './loginStatus';

export default combineReducers({
  loginStatus: loginStatusReducer,
});
