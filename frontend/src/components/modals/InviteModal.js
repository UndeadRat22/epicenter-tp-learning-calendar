import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { invite, suspendInvite } from '../../state/actions';
import InviteForm from '../auth/InviteForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { INVITE_FAILED, INVITE_SUCCEEDED, LOADING_INVITE } from '../../constants/InviteStatus';
import { NOTIFICATION_AUTO_HIDE_TIMEOUT } from '../../constants/General';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const inviteStatus = useSelector(state => state.invite.status);

  const showNotificationSuccess = inviteStatus === INVITE_SUCCEEDED;
  const showNotificationError = inviteStatus === INVITE_FAILED;
  const isLoading = inviteStatus === LOADING_INVITE;

  if (inviteStatus === INVITE_SUCCEEDED)
    setTimeout(() => { handleChangePasswordSucceed(); }, NOTIFICATION_AUTO_HIDE_TIMEOUT);

  const handleChangePasswordSucceed = () => {
    dispatch(suspendInvite());
  };

  const inviteUser = user => {
    dispatch(invite(user));
  };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModal}
      >
        <MessageBoxFunctionalLayout
          title="Invite new employee"
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          {isLoading && <Loader size="tiny" />}
          <InviteForm onInvite={user => inviteUser(user)} />
        </MessageBoxFunctionalLayout>
        {showNotificationSuccess && (
        <SuccessNotification text="Invitation sent" />
        )}
        {showNotificationError && (
        <ErrorNotification text="Invitation failed" />
        )}
      </Modal>
    </Layout>
  );
};
export default InviteModal;
