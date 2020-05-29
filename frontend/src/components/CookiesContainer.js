/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from 'react';
import { Notification } from 'wix-style-react';
import cookies from '../utils/cookies';

const CookiesContainer = () => {
  const isAccepted = cookies.get('acceptCookiesPolicy');

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const onAccept = () => {
    cookies.set('acceptCookiesPolicy', 'accepted', { path: '/', sameSite: true });
    forceUpdate();
  };

  if (isAccepted)
    return null;

  return (
    <Notification
      type="local"
      theme="warning"
      show
      actionText="Accept"
      appearance="premium"
    >
      <Notification.TextLabel>This website use cookies!</Notification.TextLabel>
      <Notification.ActionButton onClick={() => onAccept()}>
        Accept
      </Notification.ActionButton>
    </Notification>
  );
};

export default CookiesContainer;
