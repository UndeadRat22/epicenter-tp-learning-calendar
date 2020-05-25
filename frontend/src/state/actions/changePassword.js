import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_START, SUSPEND_CHANGE_PASSWORD,
} from './types/changePassword';
import { showSuccessToast, showErrorToast } from './toast';
import { logout } from './auth';

const changeStart = makeSyncActionCreator(CHANGE_PASSWORD_START);
const changeSuccess = makeSyncActionCreator(CHANGE_PASSWORD_SUCCESS);
const changeFail = makeSyncActionCreator(CHANGE_PASSWORD_FAIL);
const suspendChangePassword = makeSyncActionCreator(SUSPEND_CHANGE_PASSWORD);

const changePassword = ({ oldPassword, newPassword }) => async dispatch => {
  try {
    dispatch(changeStart());
    await Axios.put('auth/password', { oldPassword, newPassword });
    dispatch(changeSuccess());
    dispatch(showSuccessToast('Password changed'));
    dispatch(logout());
  } catch (err) {
    dispatch(showErrorToast('Failed to change password'));
    console.log(err);
    dispatch(changeFail());
  } finally {
    dispatch(suspendChangePassword());
  }
};

export { changePassword, suspendChangePassword };
