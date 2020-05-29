import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_GLOBAL_LIMITS_START, FETCH_GLOBAL_LIMITS_SUCCESS, FETCH_GLOBAL_LIMITS_FAIL,
  SAVE_GLOBAL_LIMITS_START, SAVE_GLOBAL_LIMITS_SUCCESS, SAVE_GLOBAL_LIMITS_FAIL,
} from './types/globalLimits';
import { showErrorToast } from './toast';

const fetchGlobalLimitsStart = makeSyncActionCreator(FETCH_GLOBAL_LIMITS_START);
const fetchGlobalLimitsSuccess = makeSyncActionCreator(FETCH_GLOBAL_LIMITS_SUCCESS);
const fetchGlobalLimitsFail = makeSyncActionCreator(FETCH_GLOBAL_LIMITS_FAIL);

const saveGlobalLimitsStart = makeSyncActionCreator(SAVE_GLOBAL_LIMITS_START);
const saveGlobalLimitsSuccess = makeSyncActionCreator(SAVE_GLOBAL_LIMITS_SUCCESS);
const saveGlobalLimitsFail = makeSyncActionCreator(SAVE_GLOBAL_LIMITS_FAIL);

const getGlobalLimits = () => async dispatch => {
  try {
    dispatch(fetchGlobalLimitsStart());

    const response = await Axios.get('limits/global');
    const limits = response.data;

    dispatch(fetchGlobalLimitsSuccess(limits));
  } catch (err) {
    dispatch(fetchGlobalLimitsFail());
  }
};

const saveGlobalLimits = ({ daysPerQuarter }) => async dispatch => {
  try {
    dispatch(saveGlobalLimitsStart());

    await Axios.post('limits/limit/global', { daysPerQuarter });

    dispatch(saveGlobalLimitsSuccess());
    dispatch(getGlobalLimits());
  } catch (err) {
    dispatch(saveGlobalLimitsFail());
  }
};

export { getGlobalLimits, saveGlobalLimits };
