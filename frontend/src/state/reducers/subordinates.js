import {
  LOADING_SUBORDINATES, FETCH_SUBORDINATES_SUCCEEDED, FETCH_SUBORDINATES_FAILED,
} from '../../constants/SubordinatesStatus';
import {
  FETCH_SUBORDINATES_START, FETCH_SUBORDINATES_SUCCESS, FETCH_SUBORDINATES_FAIL,
} from '../actions/types';

const initialState = {
  status: '',
  subordinates: [],
};

const subordinates = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBORDINATES_START:
      return {
        status: LOADING_SUBORDINATES,
        myTeam: [],
      };
    case FETCH_SUBORDINATES_SUCCESS:
      return {
        status: FETCH_SUBORDINATES_SUCCEEDED,
        myTeam: action.payload,
      };
    case FETCH_SUBORDINATES_FAIL:
      return {
        status: FETCH_SUBORDINATES_FAILED,
        myTeam: [],
      };
    default:
      return state;
  }
};

export default subordinates;
