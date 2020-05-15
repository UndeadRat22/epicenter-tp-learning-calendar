import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { invite, suspendInvite } from '../../state/actions';
import InviteForm from '../auth/InviteForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { INVITE_FAILED, INVITE_SUCCEEDED, LOADING_INVITE } from '../../constants/InviteStatus';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const inviteStatus = useSelector(state => state.invite.status);

  const showNotificationSuccess = inviteStatus === INVITE_SUCCEEDED;
  const showNotificationError = inviteStatus === INVITE_FAILED;
  const isLoading = inviteStatus === LOADING_INVITE;

  const inviteUser = user => {
    dispatch(invite(user));
  };

  const onCloseModalWrapper = () => {
    dispatch(suspendInvite());
    onCloseModal();
  };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModalWrapper}
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
