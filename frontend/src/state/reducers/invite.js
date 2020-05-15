
import {
  LOADING_INVITE, INVITE_FAILED, INVITE_SUCCEEDED, INVITE_INACTIVE,
} from '../../constants/InviteStatus';
import {
  INVITE_START, INVITE_SUCCESS, INVITE_FAIL, INVITE_SUSPEND,
} from '../actions/types';

const initialState = {
  status: INVITE_INACTIVE,
};

const invite = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_START:
      return {
        status: LOADING_INVITE,
      };
    case INVITE_SUCCESS:
      return {
        status: INVITE_SUCCEEDED,
      };
    case INVITE_FAIL:
      return {
        status: INVITE_FAILED,
      };
    case INVITE_SUSPEND:
      return {
        status: INVITE_INACTIVE,
      };
    default:
      return state;
  }
};

export default invite;
