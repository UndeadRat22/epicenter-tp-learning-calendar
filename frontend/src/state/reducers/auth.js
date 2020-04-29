import {
  LOGGED_OUT, LOGGED_IN, LOADING_FETCH_SELF, LOGIN_FAILED, FETCH_SELF_FAILED, REGISTER_FAILED, REGISTER_SUCCEEDED, LOADING_LOGIN, LOADING_REGISTER,
} from '../../constants/AuthStatus';
import {
  FETCH_SELF_SUCCESS, FETCH_SELF_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, LOGIN_START, FETCH_SELF_START, REGISTER_START,
} from '../actions/types/auth';

const initialState = {
  status: LOADING_FETCH_SELF,
  user: null,
};

// not sure if all this boilerplate with actions is needed
// maybe setStatus, setUser, setBoth would be enough?
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
    case REGISTER_START:
      return {
        status: LOADING_REGISTER,
        user: null,
      };
    case FETCH_SELF_SUCCESS:
      return {
        status: LOGGED_IN,
        user: action.payload.user,
      };
    case FETCH_SELF_FAIL:
      return {
        user: null,
        status: FETCH_SELF_FAILED,
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
    case REGISTER_SUCCESS:
      return {
        status: REGISTER_SUCCEEDED,
        user: action.payload.user,
      };
    case REGISTER_FAIL:
      return {
        status: REGISTER_FAILED,
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
