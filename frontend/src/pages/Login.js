import React from 'react';
import { Layout } from 'wix-style-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/actions/auth';
import Header from '../components/auth/Header';
import LoginForm from '../components/auth/LoginForm';
import ErrorNotification from '../components/ErrorNotification';
import s from './Login.scss';
import {
  LOGIN_FAILED, LOADING_LOGIN,
} from '../constants/AuthStatus';

const Login = () => {
  const authStatus = useSelector(state => state.auth.status);

  const showNotification = authStatus === LOGIN_FAILED;

  const dispatch = useDispatch();

  const handleLogin = user => dispatch(login(user));

  return (
    <div className={s.login}>
      <Layout cols={1}>
        <Header text="Login to get going" isLoading={authStatus === LOADING_LOGIN} />
        <LoginForm
          onLogin={user => handleLogin(user)}
        />
        {showNotification && (
          <ErrorNotification text="Invalid email or password" />
        )}
      </Layout>
    </div>
  );
};

export default Login;
