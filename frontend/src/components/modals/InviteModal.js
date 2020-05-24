import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { invite, suspendInvite } from '../../state/actions';
import InviteForm from '../auth/InviteForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { INVITE_FAILED, INVITE_SUCCEEDED, LOADING_INVITE } from '../../constants/InviteStatus';
import { useToast } from '../../ToastContainer';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const inviteStatus = useSelector(state => state.invite.status);

  const isLoading = inviteStatus === LOADING_INVITE;

  const inviteUser = user => {
    dispatch(invite(user));
  };

  const onSuccess = () => {
    dispatch(suspendInvite());
    onCloseModal();
  };

  const onError = () => {
    dispatch(suspendInvite());
  };

  useToast({
    successText: 'Invitation sent',
    errorText: 'Failed to send invite',
    shouldShowSuccessWhen: inviteStatus === INVITE_SUCCEEDED,
    shouldShowErrorWhen: inviteStatus === INVITE_FAILED,
    onSuccess,
    onError,
  });

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
      </Modal>
    </Layout>
  );
};
export default InviteModal;
