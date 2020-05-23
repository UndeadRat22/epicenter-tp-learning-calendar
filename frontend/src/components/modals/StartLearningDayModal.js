import React from 'react';
import {
  MessageBoxFunctionalLayout, Text, Modal,
} from 'wix-style-react';

const StartLearningDayModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      <MessageBoxFunctionalLayout
        title="Start Learning Day"
        confirmText="Yes"
        cancelText="No"
        theme="blue"
        onClose={onClose}
        onCancel={onClose}
        footerBottomChildren={(
          <div>
            <Text size="small">You can cancel it at any point.</Text>
          </div>
  )}
      >
        Are you sure you want to start a learning day?
      </MessageBoxFunctionalLayout>
    </Modal>
  );
};

export default StartLearningDayModal;
