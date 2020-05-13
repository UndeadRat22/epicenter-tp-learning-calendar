import Axios from 'axios';
import cookies from '../../utils/cookies';
import {
  FETCH_SELF_SUCCESS, FETCH_SELF_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, FETCH_SELF_START, LOGIN_START, LOGOUT,
} from './types';
import makeSyncActionCreator from '../syncActionCreator';

const fetchSelfStart = makeSyncActionCreator(FETCH_SELF_START);
const fetchSelfSuccess = makeSyncActionCreator(FETCH_SELF_SUCCESS);
const fetchSelfFail = makeSyncActionCreator(FETCH_SELF_FAIL);

const loginStart = makeSyncActionCreator(LOGIN_START);
const loginSuccess = makeSyncActionCreator(LOGIN_SUCCESS);
const loginFail = makeSyncActionCreator(LOGIN_FAIL);

const onLogout = makeSyncActionCreator(LOGOUT);

const login = ({ email, password }) => async dispatch => {
  try {
    dispatch(loginStart());

    const response = await Axios.post('auth/login', { email, password });
    const { token, expires } = response.data;

    const parsedExpires = new Date(Date.parse(expires));
    cookies.set('token', token, { path: '/', expires: parsedExpires, sameSite: true });

    dispatch(fetchSelf());
  } catch (err) {
    dispatch(loginFail());
  }
};

const fetchSelf = () => async dispatch => {
  try {
    dispatch(fetchSelfStart());

    const response = await Axios.get('employees/self');
    const user = response.data;

    dispatch(fetchSelfSuccess(user));
  } catch (err) {
    dispatch(fetchSelfFail());
  }
};

const logout = () => dispatch => {
  cookies.remove('token');
  dispatch(onLogout());
};

export {
  fetchSelfSuccess, fetchSelfFail, loginSuccess, loginFail, login, fetchSelf, logout,
};
