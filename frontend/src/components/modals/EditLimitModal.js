import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout,
} from 'wix-style-react';
import { useDispatch } from 'react-redux';
import EditLimitForm from '../myTeam/EditLimitForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';

const EditLimitModal = ({
  isModalOpened,
  onCloseModal,
  limit,
  employeeName,
}) => {
  const dispatch = useDispatch();

  const onEditLimit = editedLimit => { };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModal}
      >
        <MessageBoxFunctionalLayout
          title={`Edit Limits for ${employeeName}`}
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          <EditLimitForm onEdit={editedLimit => onEditLimit(editedLimit)} limit={limit} />
        </MessageBoxFunctionalLayout>
      </Modal>
    </Layout>
  );
};

export default EditLimitModal;
