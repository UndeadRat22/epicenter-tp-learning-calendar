import {
  LOADING_ACTION, ACTION_FAILED, ACTION_SUCCEEDED,
} from '../../constants/ActionStatus';
import {
  ACTION_START, ACTION_SUCCESS, ACTION_FAIL,
} from '../actions/types/action';

const initialState = {
  status: LOADING_ACTION,
};

const apiAction = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_START:
      return {
        status: LOADING_ACTION,
      };
    case ACTION_SUCCESS:
      return {
        status: ACTION_SUCCEEDED,
      };
    case ACTION_FAIL:
      return {
        status: ACTION_FAILED,
      };
    default:
      return state;
  }
};

export default apiAction;
