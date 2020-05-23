import React from 'react';
import {
  MessageBoxFunctionalLayout, Text, Modal, Loader,
} from 'wix-style-react';

const StartLearningDayModal = ({
  isOpen, onClose, onStartLearningDay, isLoading, children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      {children}
      <MessageBoxFunctionalLayout
        title="Start Learning Day"
        confirmText="Yes"
        cancelText="No"
        theme="blue"
        onClose={onClose}
        onOk={onStartLearningDay}
        onCancel={onClose}
        footerBottomChildren={(
          <div>
            <Text size="small">You can cancel it at any point in the future</Text>
          </div>
  )}
      >
        Are you sure you want to start a learning day?
        {isLoading && <Loader size="tiny" />}
      </MessageBoxFunctionalLayout>
    </Modal>
  );
};

export default StartLearningDayModal;
