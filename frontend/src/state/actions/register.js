import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL, VALIDATE_INVITEID_FAIL, VALIDATE_INVITEID_SUCCESS, VALIDATE_INVITEID_START,
} from './types';

const registerStart = makeSyncActionCreator(REGISTER_START);
const registerSuccess = makeSyncActionCreator(REGISTER_SUCCESS);
const registerFail = makeSyncActionCreator(REGISTER_FAIL);

const validateInviteIdStart = makeSyncActionCreator(VALIDATE_INVITEID_START);
const validateInviteIdSuccess = makeSyncActionCreator(VALIDATE_INVITEID_SUCCESS);
const validateInviteIdFail = makeSyncActionCreator(VALIDATE_INVITEID_FAIL);

const validateInviteId = inviteId => async dispatch => {
  try {
    dispatch(validateInviteIdStart());

    const response = await Axios.get(`invites/invite/${inviteId}`);
    const { inviteeDetails, inviterDetails } = response.data;

    dispatch(validateInviteIdSuccess({ inviteeDetails, inviterDetails }));
  } catch (err) {
    dispatch(validateInviteIdFail());
  }
};

const register = ({ inviteId, password }) => async dispatch => {
  try {
    dispatch(registerStart());

    await Axios.post('auth/register', { inviteId, password });

    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFail());
  }
};


export { register, validateInviteId };
