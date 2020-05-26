import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  EDIT_LIMIT_START, EDIT_LIMIT_SUCCESS, EDIT_LIMIT_FAIL, SUSPEND_EDIT_LIMIT,
} from './types/editLimit';
import { showSuccessToast, showErrorToast } from './toast';
import { getMyTeam } from './myTeam';

const editLimitStart = makeSyncActionCreator(EDIT_LIMIT_START);
const editLimitSuccess = makeSyncActionCreator(EDIT_LIMIT_SUCCESS);
const editLimitFail = makeSyncActionCreator(EDIT_LIMIT_FAIL);
const suspendEditLimit = makeSyncActionCreator(SUSPEND_EDIT_LIMIT);

const editLimit = limit => async dispatch => {
  try {
    dispatch(editLimitStart());
    await Axios.post('limits/limit', limit);

    dispatch(editLimitSuccess());
    dispatch(showSuccessToast('Limit edited'));
    dispatch(getMyTeam());
  } catch (err) {
    dispatch(showErrorToast('Failed to edit limit'));
    dispatch(editLimitFail());
  } finally {
    dispatch(suspendEditLimit());
  }
};

export { editLimit };
