import React from 'react';
import { Layout, Notification } from 'wix-style-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/actions/auth';
import Header from '../components/auth/Header';
import LoginForm from '../components/auth/LoginForm';
import Alert from '../components/Alert';
import s from './Login.scss';
import {
  LOGIN_FAILED, LOADING_LOGIN,
} from '../constants/AuthStatus';

const Login = () => {
  const authStatus = useSelector(state => state.auth.status);

  const showAlert = authStatus === LOGIN_FAILED;

  const dispatch = useDispatch();

  const handleLogin = user => dispatch(login(user));

  // TODO: use similar component for notifications
  // perhaps, use either <Notification /> from wix-style-react and
  // abstract away "theme" by creating a few components? Example:
  // <ErrorNotification />, <SuccessNotification />
  return (
    <div className={s.login}>
      <Layout cols={1}>
        <Header text="Login to get going" isLoading={authStatus === LOADING_LOGIN} />
        <LoginForm
          onLogin={user => handleLogin(user)}
        />
        {showAlert && (
          <Notification autoHideTimeout={3000} type="sticky" theme="error" show>
            <Notification.TextLabel>Invalid email or password</Notification.TextLabel>
            <Notification.CloseButton />
          </Notification>
        )}
      </Layout>
    </div>
  );
};

export default Login;
