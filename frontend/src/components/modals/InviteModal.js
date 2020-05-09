import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { invite } from '../../state/actions';
import InviteForm from '../auth/InviteForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { INVITE_SUCCESS } from '../../state/actions/types';
import Notification from '../Notification';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const inviteStatus = useSelector(state => state.invite.status);

  // TODO: error handle INVITE_FAIL
  const showNotification = inviteStatus === INVITE_SUCCESS;

  const inviteUser = user => {
    dispatch(invite(user));
  };

  return (
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
