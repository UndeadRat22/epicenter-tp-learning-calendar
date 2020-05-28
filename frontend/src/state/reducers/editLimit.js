import {
  LOADING_EDIT_LIMIT, EDIT_LIMIT_SUCCEEDED, EDIT_LIMIT_FAILED, EDIT_LIMIT_INACTIVE,
} from '../../constants/EditLimitStatus';
import {
  EDIT_LIMIT_START, EDIT_LIMIT_SUCCESS, EDIT_LIMIT_FAIL, SUSPEND_EDIT_LIMIT,
} from '../actions/types/editLimit';

const initialState = {
  status: EDIT_LIMIT_INACTIVE,
};

const editLimit = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_LIMIT_START:
      return {
        status: LOADING_EDIT_LIMIT,
      };
    case EDIT_LIMIT_SUCCESS:
      return {
        status: EDIT_LIMIT_SUCCEEDED,
      };
    case EDIT_LIMIT_FAIL:
      return {
        status: EDIT_LIMIT_FAILED,
      };
    case SUSPEND_EDIT_LIMIT:
      return {
        status: EDIT_LIMIT_INACTIVE,
      };
    default:
      return state;
  }
};

export default editLimit;
