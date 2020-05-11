import { LOADING_CHANGE, CHANGE_FAILED, CHANGE_SUCCEEDED } from '../../constants/PasswordStatus';
import { CHANGE_FAIL, CHANGE_SUCCESS, CHANGE_START } from '../actions/types/password';

const initialState = {
  status: '',
};

const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_START:
      return {
        status: LOADING_CHANGE,
      };
    case CHANGE_SUCCESS:
      return {
        status: CHANGE_SUCCEEDED,
      };
    case CHANGE_FAIL:
      return {
        status: CHANGE_FAILED,
      };
    default:
      return state;
  }
};

export default changePassword;
