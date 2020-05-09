import React from 'react';
import { Modal, MessageBoxFunctionalLayout } from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { invite } from '../../state/actions/auth';
import InviteForm from '../auth/InviteForm';
import Notification from '../Notification';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { INVITE_SUCCESS } from '../../state/actions/types/auth';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // TODO: error handle INVITE_FAIL
  const showNotification = auth.status === INVITE_SUCCESS;

  const inviteUser = user => {
    dispatch(invite(user));
  };

  return (
    <Modal
      isOpen={isModalOpened}
      onRequestClose={() => onCloseModal()}
      onClose={() => onCloseModal()}
      shouldDisplayCloseButton
    >
      <MessageBoxFunctionalLayout
        title="Invite new employee"
        maxHeight={MODAL_MAX_HEIGHT}
      >
        {showNotification && (
          <Notification
            type="success"
            text="Invitation sent"
          />
        )}
        <InviteForm onInvite={user => inviteUser(user)} />
      </MessageBoxFunctionalLayout>
    </Modal>
  );
};
export default InviteModal;
