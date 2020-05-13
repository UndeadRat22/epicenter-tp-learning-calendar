import {
  LOGGED_OUT, LOGGED_IN, LOADING_FETCH_SELF, LOGIN_FAILED, FETCH_SELF_FAILED, LOADING_LOGIN,
} from '../../constants/AuthStatus';
import {
  FETCH_SELF_SUCCESS, FETCH_SELF_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGIN_START, FETCH_SELF_START,
} from '../actions/types';

const initialState = {
  status: LOADING_FETCH_SELF,
  user: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        status: LOADING_LOGIN,
        user: null,
      };
    case FETCH_SELF_START:
      return {
        status: LOADING_FETCH_SELF,
        user: null,
      };
    case FETCH_SELF_SUCCESS:
      return {
        status: LOGGED_IN,
        user: action.payload,
      };
    case FETCH_SELF_FAIL:
      return {
        status: FETCH_SELF_FAILED,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        status: LOGGED_IN,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
      return {
        status: LOGIN_FAILED,
        user: null,
      };
    case LOGOUT:
      return {
        status: LOGGED_OUT,
        user: null,
      };
    default:
      return state;
  }
};

export default auth;
