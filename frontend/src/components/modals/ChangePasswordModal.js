import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../../state/actions';
import ChangePasswordForm from '../auth/ChangePasswordForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { LOADING_CHANGE, CHANGE_FAILED, CHANGE_SUCCEEDED } from '../../constants/PasswordStatus';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

const InviteModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const changePasswordStatus = useSelector(state => state.changePassword.status);

  const showNotificationSuccess = changePasswordStatus === CHANGE_SUCCEEDED;
  const showNotificationError = changePasswordStatus === CHANGE_FAILED;
  const isLoading = changePasswordStatus === LOADING_CHANGE;

  const changeCurrentPassword = passwords => {
    dispatch(changePassword(passwords));
  };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModal}
      >
        <MessageBoxFunctionalLayout
          title="Change password"
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          {isLoading && <Loader size="tiny" />}
          <ChangePasswordForm onChange={passwords => changeCurrentPassword(passwords)} />
        </MessageBoxFunctionalLayout>
        {showNotificationSuccess && (
        <SuccessNotification text="Password changed" />
        )}
        {showNotificationError && (
        <ErrorNotification text="Old password is incorrect" />
        )}
      </Modal>
    </Layout>
  );
};
export default InviteModal;
