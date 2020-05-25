import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { invite, suspendInvite } from '../../state/actions';
import InviteForm from '../auth/InviteForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { INVITE_FAILED, INVITE_SUCCEEDED, LOADING_INVITE } from '../../constants/InviteStatus';
import { showErrorToast } from '../../state/actions/toast';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const inviteStatus = useSelector(state => state.invite.status);

  if (inviteStatus === INVITE_SUCCEEDED)
    onCloseModal();

  const onInvite = user => {
    if (user.firstName === '' || user.lastName === '' || user.email === '')
      dispatch(showErrorToast('All fields must be not filled'));
    else
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
          <InviteForm onInvite={user => onInvite(user)} />
        </MessageBoxFunctionalLayout>
      </Modal>
    </Layout>
  );
};
export default InviteModal;
