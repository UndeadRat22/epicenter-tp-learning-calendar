
import {
  LOADING_INVITE, INVITE_FAILED, INVITE_SUCCEEDED,
} from '../../constants/InviteStatus';
import { INVITE_START, INVITE_SUCCESS, INVITE_FAIL } from '../actions/types';

const initialState = {
  status: '',
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
    default:
      return state;
  }
};

export default invite;
