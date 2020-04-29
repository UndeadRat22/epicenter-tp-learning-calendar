import React from 'react';
import { Layout, Loader } from 'wix-style-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { login } from '../state/actions/auth';
import Header from '../components/auth/Header';
import LoginForm from '../components/auth/LoginForm';
import s from './Login.scss';
import {
  LOGGED_IN, LOGIN_FAILED, LOADING_LOGIN,
} from '../constants/AuthStatus';

const Login = () => {
  const auth = useSelector(state => state.auth);
  const { status } = auth;

  const dispatch = useDispatch();

  const handleLogin = user => dispatch(login(user));

  if (status === LOGGED_IN)
    return <Redirect to="/home" />;

  if (status === LOGIN_FAILED)
    alert('Incorrect email or password!');

  return (
    <div className={s.login}>
      <Layout cols={1}>
        <Header text="Login to get going" isLoading={status === LOADING_LOGIN} />
        <LoginForm
          onLogin={user => handleLogin(user)}
        />
      </Layout>
    </div>
  );
};

export default Login;
