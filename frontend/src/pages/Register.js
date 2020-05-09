import React from 'react';
import { Layout } from 'wix-style-react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/auth/Header';
import RegisterForm from '../components/auth/RegisterForm';
import s from './Register.scss';
import { register, fetchSelf } from '../state/actions/auth';
import { LOGGED_IN, REGISTER_SUCCEEDED } from '../constants/AuthStatus';
import Notification from '../components/Notification';

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const showNotification = auth.status === REGISTER_SUCCEEDED;

  const registerUser = user => {
    dispatch(register(user));
  };

  if (auth.status === REGISTER_SUCCEEDED)
    dispatch(fetchSelf());
  else if (auth.status === LOGGED_IN)
    return <Redirect to="/home" />;

  return (
    <div className={s.register}>
      <Layout cols={1}>
        <Header text="Finish your registration" />
        {showNotification && (
          <Notification
            type="success"
            text="Registration successful"
          />
        )}
        <RegisterForm
          onRegister={user => registerUser(user)}
        />
      </Layout>
    </div>
  );
};
export default Register;
