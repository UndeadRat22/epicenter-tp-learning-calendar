import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_LIMITS_START, FETCH_LIMITS_SUCCESS, FETCH_LIMITS_FAIL } from './types/limits';

const fetchLimitsStart = makeSyncActionCreator(FETCH_LIMITS_START);
const fetchLimitsSuccess = makeSyncActionCreator(FETCH_LIMITS_SUCCESS);
const fetchLimitsFail = makeSyncActionCreator(FETCH_LIMITS_FAIL);

const getLimits = () => async dispatch => {
  try {
    dispatch(fetchLimitsStart());

    const response = await Axios.get('limits');
    const limits = response.data;

    dispatch(fetchLimitsSuccess(limits));
  } catch (err) {
    dispatch(fetchLimitsFail());
  }
};

export { getLimits };
