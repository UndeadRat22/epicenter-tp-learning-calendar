/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from 'react';
import { Notification } from 'wix-style-react';
import cookies from '../utils/cookies';
import s from './Cookies.global.scss';

const CookiesContainer = () => {
  const isAccepted = cookies.get('acceptCookiesPolicy');

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

  const onAccept = () => {
    cookies.set('acceptCookiesPolicy', 'accepted', { path: '/', expires: nextWeek, sameSite: true });
    forceUpdate();
  };

  if (isAccepted)
    return null;

  return (
    <div className={s.snackbar}>
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
    </div>
  );
};

export default CookiesContainer;
