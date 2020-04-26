import React from 'react';
import { Layout, Loader } from 'wix-style-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { login } from '../state/actions/auth';
import Header from '../components/auth/Header';
import SignInForm from '../components/auth/signInForm';
import s from './SignIn.scss';
import { LOGGED_IN, LOGIN_FAILED, LOADING_LOGIN } from '../constants/AuthStatus';
import LoadingIndicator from '../components/LoadingIndicator';

const SignIn = () => {
  const auth = useSelector(state => state.auth);
  const { status } = auth;

  const dispatch = useDispatch();

  const handleSignIn = user => dispatch(login(user));

  if (status === LOGGED_IN)
    return <Redirect to="/home" />;

  // if (status === LOADING_LOGIN)
  //   return <LoadingIndicator text="Loading user..." />;

  if (status === LOGIN_FAILED)
    alert('Incorrect email or password!');

  return (
    <div className={s.signin}>
      <Layout cols={1}>
        <Header text="Login to get going" isLoading={status === LOADING_LOGIN} />
        <SignInForm
          onSignInUser={user => handleSignIn(user)}
        />
      </Layout>
    </div>
  );
};

export default SignIn;
