import {
  INACTIVE_FETCH_GLOBAL_LIMITS, LOADING_FETCH_GLOBAL_LIMITS, FETCH_GLOBAL_LIMITS_SUCCEEDED, FETCH_GLOBAL_LIMITS_FAILED,
  INACTIVE_SAVE_GLOBAL_LIMITS, LOADING_SAVE_GLOBAL_LIMITS, SAVE_GLOBAL_LIMITS_SUCCEEDED, SAVE_GLOBAL_LIMITS_FAILED,
} from '../../constants/GlobalLimitsStatus';
import {
  FETCH_GLOBAL_LIMITS_START, FETCH_GLOBAL_LIMITS_SUCCESS, FETCH_GLOBAL_LIMITS_FAIL,
  SAVE_GLOBAL_LIMITS_START, SAVE_GLOBAL_LIMITS_SUCCESS, SAVE_GLOBAL_LIMITS_FAIL,
} from '../actions/types/globalLimits';

const initialState = {
  fetchStatus: INACTIVE_FETCH_GLOBAL_LIMITS,
  saveStatus: INACTIVE_SAVE_GLOBAL_LIMITS,
  limit: {},
};

const globalLimits = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GLOBAL_LIMITS_START:
      return {
        ...state,
        fetchStatus: LOADING_FETCH_GLOBAL_LIMITS,
        limit: {},
      };
    case FETCH_GLOBAL_LIMITS_SUCCESS:
      return {
        ...state,
        fetchStatus: FETCH_GLOBAL_LIMITS_SUCCEEDED,
        limit: action.payload,
      };
    case FETCH_GLOBAL_LIMITS_FAIL:
      return {
        ...state,
        fetchStatus: FETCH_GLOBAL_LIMITS_FAILED,
        limit: {},
      };
    case SAVE_GLOBAL_LIMITS_START:
      return {
        ...state,
        saveStatus: LOADING_SAVE_GLOBAL_LIMITS,
      };
    case SAVE_GLOBAL_LIMITS_SUCCESS:
      return {
        ...state,
        saveStatus: SAVE_GLOBAL_LIMITS_SUCCEEDED,
      };
    case SAVE_GLOBAL_LIMITS_FAIL:
      return {
        ...state,
        saveStatus: SAVE_GLOBAL_LIMITS_FAILED,
      };
    default:
      return state;
  }
};

export default globalLimits;
