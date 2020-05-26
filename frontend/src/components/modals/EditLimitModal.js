import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { editLimit } from '../../state/actions/editLimit';
import EditLimitForm from '../myTeam/EditLimitForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import {
  LOADING_EDIT_LIMIT, EDIT_LIMIT_SUCCEEDED,
} from '../../constants/EditLimitStatus';

const EditLimitModal = ({ isModalOpened, onCloseModal, employee }) => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.editLimit);

  const isLoading = status === LOADING_EDIT_LIMIT;

  const onEditLimit = editedLimit => dispatch(editLimit({ employeeId: employee.id, daysPerQuarter: editedLimit.learningDaysPerQuarter }));

  if (status === EDIT_LIMIT_SUCCEEDED)
    onCloseModal();

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModal}
      >
        <MessageBoxFunctionalLayout
          title={`Edit Limits for ${employee.name}`}
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          {isLoading && <div style={{ textAlign: 'center' }}><Loader size="small" /></div> }
          <EditLimitForm onEdit={editedLimit => onEditLimit(editedLimit)} limit={employee.limit} />
        </MessageBoxFunctionalLayout>
      </Modal>
    </Layout>
  );
};

export default EditLimitModal;
