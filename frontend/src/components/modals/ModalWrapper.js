import React from 'react';
import {
  MessageBoxFunctionalLayout, Text, Modal, Loader,
} from 'wix-style-react';

const ModalWrapper = ({
  isOpen, onClose, onOk, isLoading, children, alert, title, footerText, text,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      {children}
      <MessageBoxFunctionalLayout
        title={title}
        confirmText="Yes"
        cancelText="No"
        theme={alert ? 'red' : 'blue'}
        onClose={onClose}
        onOk={onOk}
        onCancel={onClose}
        footerBottomChildren={(
          <div>
            <Text size="small">{footerText}</Text>
          </div>
  )}
      >
        {text}
        {isLoading && <Loader size="tiny" />}
      </MessageBoxFunctionalLayout>
    </Modal>
  );
};

export default ModalWrapper;
