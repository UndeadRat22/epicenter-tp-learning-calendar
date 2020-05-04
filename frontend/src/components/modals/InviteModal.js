import React, { useState } from 'react';
import { Modal, MessageBoxFunctionalLayout } from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import post from '../../state/actions/action';
import InviteForm from '../auth/InviteForm';
import Notification from '../Notification';
import { ACTION_SUCCEEDED } from '../../constants/ActionStatus';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();
  const action = useSelector(state => state.apiAction);

  const inviteUser = user => {
    dispatch(post('invites/invite', user));
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
        maxHeight={MODAL_MAX_HEIGHT}
      >
        {showNotification[1] && (
          <Notification
            type="success"
            text="Invitation sent"
            onClose={() => setShowNotification(false)}
          />
        )}
        <InviteForm onInvite={user => inviteUser(user)} />
      </MessageBoxFunctionalLayout>
    </Modal>
  );
};
export default InviteModal;
