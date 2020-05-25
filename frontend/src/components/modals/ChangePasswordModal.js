import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword, suspendChangePassword, logout } from '../../state/actions';
import ChangePasswordForm from '../auth/ChangePasswordForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { LOADING_CHANGE_PASSWORD, CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_SUCCEEDED } from '../../constants/ChangePasswordStatus';
import { useToast } from '../../ToastContainer';

const ChangePasswordModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const changePasswordStatus = useSelector(state => state.changePassword.status);

  const isLoading = changePasswordStatus === LOADING_CHANGE_PASSWORD;

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
      </Modal>
    </Layout>
  );
};
export default ChangePasswordModal;
