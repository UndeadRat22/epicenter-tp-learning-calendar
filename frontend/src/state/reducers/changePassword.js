import { LOADING_CHANGE_PASSWORD, CHANGE_FAILED_PASSWORD, CHANGE_SUCCEEDED_PASSWORD } from '../../constants/ChangePasswordStatus';
import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_START } from '../actions/types/password';

const initialState = {
  status: '',
};

const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_START:
      return {
        status: LOADING_CHANGE_PASSWORD,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        status: CHANGE_SUCCEEDED_PASSWORD,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        status: CHANGE_FAILED_PASSWORD,
      };
    default:
      return state;
  }
};

export default changePassword;
