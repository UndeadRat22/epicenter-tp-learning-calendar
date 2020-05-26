import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  INVITE_START, INVITE_SUCCESS, INVITE_FAIL, INVITE_SUSPEND,
} from './types';
import { showSuccessToast, showErrorToast } from './toast';

const inviteStart = makeSyncActionCreator(INVITE_START);
const inviteSuccess = makeSyncActionCreator(INVITE_SUCCESS);
const inviteFail = makeSyncActionCreator(INVITE_FAIL);
const suspendInvite = makeSyncActionCreator(INVITE_SUSPEND);

const invite = ({
  email, firstName, lastName, role,
}) => async dispatch => {
  try {
    dispatch(inviteStart());
    await Axios.post('invites/invite', {
      email, firstName, lastName, role,
    });
    dispatch(inviteSuccess());
    dispatch(showSuccessToast('Invite sent'));
  } catch (err) {
    dispatch(showErrorToast('Failed to send invite'));
    console.log(err.response.data);
    dispatch(inviteFail());
  } finally {
    dispatch(suspendInvite());
  }
};

export { invite, suspendInvite };
