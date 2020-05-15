import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_START, SUSPEND_CHANGE_PASSWORD,
} from './types/password';

const changeStart = makeSyncActionCreator(CHANGE_PASSWORD_START);
const changeSuccess = makeSyncActionCreator(CHANGE_PASSWORD_SUCCESS);
const changeFail = makeSyncActionCreator(CHANGE_PASSWORD_FAIL);
const changeSuspend = makeSyncActionCreator(SUSPEND_CHANGE_PASSWORD);

const changePassword = ({ oldPassword, newPassword }) => async dispatch => {
  try {
    dispatch(changeStart());
    await Axios.put('auth/password', { oldPassword, newPassword });
    dispatch(changeSuccess());
  } catch (err) {
    console.log(err);
    dispatch(changeFail());
  }
};

const suspendChangePassword = () => async dispatch => {
  dispatch(changeSuspend());
};

export { changePassword, suspendChangePassword };