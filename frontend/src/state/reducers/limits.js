import {
  INACTIVE_FETCH_LIMITS, LOADING_FETCH_LIMITS, FETCH_LIMITS_FAILED, FETCH_LIMITS_SUCCEEDED,
} from '../../constants/LimitsStatus';
import { FETCH_LIMITS_START, FETCH_LIMITS_FAIL, FETCH_LIMITS_SUCCESS } from '../actions/types/limits';

const initialState = {
  status: INACTIVE_FETCH_LIMITS,
  assignedLimit: null,
  remainingLimit: null,
};

const limits = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIMITS_START:
      return {
        ...state,
        status: LOADING_FETCH_LIMITS,
      };
    case FETCH_LIMITS_FAIL:
      return {
        ...state,
        status: FETCH_LIMITS_FAILED,
      };
    case FETCH_LIMITS_SUCCESS:
      return {
        status: FETCH_LIMITS_SUCCEEDED,
        assignedLimit: action.payload.assignedLimit,
        remainingLimit: action.payload.remainingLimit,
      };
    default:
      return state;
  }
};

export default limits;
