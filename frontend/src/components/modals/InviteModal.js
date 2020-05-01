import React, { useState } from 'react';
import { Modal, MessageBoxFunctionalLayout } from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import doAction from '../../state/actions/action';
import InviteForm from '../auth/InviteForm';
import Notification from '../Notification';
import {
  ACTION_FAILED, ACTION_SUCCEEDED,
} from '../../constants/ActionStatus';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();
  const action = useSelector(state => state.action);

  const inviteUser = user => {
    dispatch(doAction('invites/invite', user));
  };

  if (action.status === ACTION_SUCCEEDED)
    setShowNotification(true);

  return (
    <Modal
      isOpen={isModalOpened}
      onRequestClose={() => onCloseModal()}
      onClose={() => onCloseModal()}
      shouldDisplayCloseButton
    >
      <MessageBoxFunctionalLayout
        title="Invite new employee"
        maxHeight="800px"
      >
        {showNotification ? (
          <Notification
            type="success"
            text="Invitation sent"
            onClose={() => setShowNotification(false)}
          />
        ) : null}
        <InviteForm onInvite={user => inviteUser(user)} />
      </MessageBoxFunctionalLayout>
    </Modal>
  );
};
export default InviteModal;
