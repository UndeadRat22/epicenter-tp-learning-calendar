import {
  LOADING_CHANGE_PASSWORD, CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_SUCCEEDED, CHANGE_PASSWORD_SUSPENDED,
} from '../../constants/ChangePasswordStatus';
import {
  CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_START, SUSPEND_CHANGE_PASSWORD,
} from '../actions/types/password';

const initialState = {
  status: CHANGE_PASSWORD_SUSPENDED,
};

const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_START:
      return {
        status: LOADING_CHANGE_PASSWORD,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        status: CHANGE_PASSWORD_SUCCEEDED,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        status: CHANGE_PASSWORD_FAILED,
      };
    case SUSPEND_CHANGE_PASSWORD:
      return {
        status: CHANGE_PASSWORD_SUSPENDED,
      };
    default:
      return state;
  }
};

export default changePassword;
