import React from 'react';
import { Modal, MessageBoxFunctionalLayout } from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import invite from '../../state/actions/auth';
import InviteForm from '../auth/InviteForm';
import Notification from '../Notification';
import { ACTION_SUCCEEDED } from '../../constants/ActionStatus';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const action = useSelector(state => state.apiAction);

  const showNotification = action.status === ACTION_SUCCEEDED;

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
