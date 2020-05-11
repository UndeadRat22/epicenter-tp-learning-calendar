import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { CHANGE_FAIL, CHANGE_SUCCESS, CHANGE_START } from './types/password';

const changeStart = makeSyncActionCreator(CHANGE_START);
const changeSuccess = makeSyncActionCreator(CHANGE_SUCCESS);
const changeFail = makeSyncActionCreator(CHANGE_FAIL);

const changePassword = ({ oldPassword, newPassword }) => async dispatch => {
  try {
    dispatch(changeStart());
    await Axios.put('/auth/password', { oldPassword, newPassword });
    dispatch(changeSuccess());
  } catch (err) {
    console.log(err);
    dispatch(changeFail());
  }
};

export { changePassword };
