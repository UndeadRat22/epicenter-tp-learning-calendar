import React, { useState } from 'react';
import {
  MessageBoxFunctionalLayout, FormField, Checkbox, Text, Modal,
} from 'wix-style-react';

const DeleteLearningDayModal = ({ isOpen, onClose }) => {
  const [dontAskChecked, setDontAskChecked] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      <MessageBoxFunctionalLayout
        title="Delete learning day"
        confirmText="Yes"
        cancelText="No"
        theme="red"
        onClose={onClose}
        onCancel={onClose}
        footerBottomChildren={(
          <div>
            <Text size="small">Once deleted, cannot be undone.</Text>
          </div>
  )}
        sideActions={(
          <FormField label="Don't ask me again" labelPlacement="right">
            <Checkbox checked={dontAskChecked} onChange={ref => setDontAskChecked(ref.target.checked)} />
          </FormField>
  )}
      >
        Do you really want to delete learning day together with all topics?
      </MessageBoxFunctionalLayout>
    </Modal>
  );
};

export default DeleteLearningDayModal;
