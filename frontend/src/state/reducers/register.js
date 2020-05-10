
import {
  REGISTER_FAILED, REGISTER_SUCCEEDED, LOADING_REGISTER, LOADING_VALIDATE_INVITEID, VALIDATE_INVITEID_SUCCEEDED, VALIDATE_INVITEID_FAILED,
} from '../../constants/RegisterStatus';
import {
  REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_START, VALIDATE_INVITEID_START, VALIDATE_INVITEID_SUCCESS, VALIDATE_INVITEID_FAIL,
} from '../actions/types';

const initialState = {
  status: LOADING_VALIDATE_INVITEID,
  invitedUser: null,
  inviterUser: null,
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_INVITEID_START:
      return {
        status: LOADING_VALIDATE_INVITEID,
      };
    case VALIDATE_INVITEID_SUCCESS:
      return {
        status: VALIDATE_INVITEID_SUCCEEDED,
        invitedUser: action.payload.inviteeDetails,
        inviterUser: action.payload.inviterDetails,
      };
    case VALIDATE_INVITEID_FAIL:
      return {
        status: VALIDATE_INVITEID_FAILED,
      };
    case REGISTER_START:
      return {
        ...state,
        status: LOADING_REGISTER,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        status: REGISTER_SUCCEEDED,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        status: REGISTER_FAILED,
      };
    default:
      return state;
  }
};

export default register;
