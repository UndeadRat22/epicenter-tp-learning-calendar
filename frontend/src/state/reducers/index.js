import { combineReducers } from 'redux';
import { authenticationStatusReducer } from './authenticationStatus';
import { userReducer } from './user';

export default combineReducers({
  isAuthenticated: authenticationStatusReducer,
  user: userReducer,
});
