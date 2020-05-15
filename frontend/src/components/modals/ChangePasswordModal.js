import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword, suspendChangePassword } from '../../state/actions';
import ChangePasswordForm from '../auth/ChangePasswordForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { LOADING_CHANGE_PASSWORD, CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_SUCCEEDED } from '../../constants/ChangePasswordStatus';
import { NOTIFICATION_AUTO_HIDE_TIMEOUT } from '../../constants/General';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

const ChangePasswordModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const changePasswordStatus = useSelector(state => state.changePassword.status);

  const showNotificationSuccess = changePasswordStatus === CHANGE_PASSWORD_SUCCEEDED;
  const showNotificationError = changePasswordStatus === CHANGE_PASSWORD_FAILED;
  const isLoading = changePasswordStatus === LOADING_CHANGE_PASSWORD;

  if (changePasswordStatus === CHANGE_PASSWORD_SUCCEEDED)
    setTimeout(() => { onCloseModalWrapper(); }, NOTIFICATION_AUTO_HIDE_TIMEOUT);

  const changeCurrentPassword = passwords => {
    dispatch(changePassword(passwords));
  };

  const onCloseModalWrapper = () => {
    dispatch(suspendChangePassword());
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
export default ChangePasswordModal;
