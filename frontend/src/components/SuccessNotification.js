import React from 'react';
import { Notification } from 'wix-style-react';
import { NOTIFICATION_AUTO_HIDE_TIMEOUT } from '../constants/General';

const SuccessNotification = ({ text, autoHideTimeout = NOTIFICATION_AUTO_HIDE_TIMEOUT, onClose }) => {
  return (
    <Notification
      autoHideTimeout={autoHideTimeout}
      onClose={onClose}
      type="sticky"
      theme="success"
      show
    >
      <Notification.TextLabel>{text}</Notification.TextLabel>
      <Notification.CloseButton />
    </Notification>
  );
};

export default SuccessNotification;
