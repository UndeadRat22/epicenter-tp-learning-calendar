import {
  LOADING_SUBORDINATES, FETCH_SUBORDINATES_SUCCEEDED, FETCH_SUBORDINATES_FAILED,
  LOADING_UPDATE_SUBORDINATE, UPDATE_SUBORDINATE_SUCCEEDED, UPDATE_SUBORDINATE_FAILED, INACTIVE_UPDATE_SUBORDINATE,
  LOADING_DELETE_SUBORDINATE, DELETE_SUBORDINATE_SUCCEEDED, DELETE_SUBORDINATE_DAY_FAILED, INACTIVE_DELETE_SUBORDINATE,
} from '../../constants/SubordinatesStatus';
import {
  FETCH_SUBORDINATES_START, FETCH_SUBORDINATES_SUCCESS, FETCH_SUBORDINATES_FAIL,
  UPDATE_SUBORDINATE_START, UPDATE_SUBORDINATE_SUCCESS, UPDATE_SUBORDINATE_FAIL, UPDATE_SUBORDINATE_SUSPEND,
  DELETE_SUBORDINATE_START, DELETE_SUBORDINATE_SUCCESS, DELETE_SUBORDINATE_FAIL, DELETE_SUBORDINATE_SUSPEND,
} from '../actions/types/subordinates';

const initialState = {
  status: '',
  updateStatus: INACTIVE_UPDATE_SUBORDINATE,
  deleteStatus: INACTIVE_DELETE_SUBORDINATE,
  subordinates: [],
};

const subordinates = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBORDINATES_START:
      return {
        ...state,
        status: LOADING_SUBORDINATES,
        subordinates: [],
      };
    case FETCH_SUBORDINATES_SUCCESS:
      return {
        ...state,
        status: FETCH_SUBORDINATES_SUCCEEDED,
        subordinates: action.payload,
      };
    case FETCH_SUBORDINATES_FAIL:
      return {
        ...state,
        status: FETCH_SUBORDINATES_FAILED,
        subordinates: [],
      };
    case UPDATE_SUBORDINATE_START:
      return {
        ...state,
        updateStatus: LOADING_UPDATE_SUBORDINATE,
      };
    case UPDATE_SUBORDINATE_SUCCESS:
      return {
        ...state,
        updateStatus: UPDATE_SUBORDINATE_SUCCEEDED,
      };
    case UPDATE_SUBORDINATE_FAIL:
      return {
        ...state,
        updateStatus: UPDATE_SUBORDINATE_FAILED,
      };
    case UPDATE_SUBORDINATE_SUSPEND:
      return {
        ...state,
        updateStatus: INACTIVE_UPDATE_SUBORDINATE,
      };
    case DELETE_SUBORDINATE_START:
      return {
        ...state,
        deleteStatus: LOADING_DELETE_SUBORDINATE,
      };
    case DELETE_SUBORDINATE_SUCCESS:
      return {
        ...state,
        deleteStatus: DELETE_SUBORDINATE_SUCCEEDED,
      };
    case DELETE_SUBORDINATE_FAIL:
      return {
        ...state,
        deleteStatus: DELETE_SUBORDINATE_DAY_FAILED,
      };
    case DELETE_SUBORDINATE_SUSPEND:
      return {
        ...state,
        deleteStatus: INACTIVE_DELETE_SUBORDINATE,
      };
    default:
      return state;
  }
};

export default subordinates;
