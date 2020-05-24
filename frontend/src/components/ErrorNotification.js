import React from 'react';
import { Notification } from 'wix-style-react';
import { NOTIFICATION_AUTO_HIDE_TIMEOUT } from '../constants/General';

const ErrorNotification = ({ text, autoHideTimeout = NOTIFICATION_AUTO_HIDE_TIMEOUT, onClose }) => {
  const modalZIndex = 5000; // comes from wix-style-react
  return (
    <Notification
      autoHideTimeout={autoHideTimeout}
      onClose={onClose}
      type="sticky"
      theme="error"
      show
      zIndex={modalZIndex + 1}
    >
      <Notification.TextLabel>{text}</Notification.TextLabel>
      <Notification.CloseButton />
    </Notification>
  );
};

export default ErrorNotification;
