import React from 'react';
import { Layout } from 'wix-style-react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/auth/Header';
import RegisterForm from '../components/auth/RegisterForm';
import s from './Register.scss';
import { register, fetchSelf } from '../state/actions/auth';
import { LOGGED_IN, REGISTER_SUCCEEDED } from '../constants/AuthStatus';

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const registerUser = user => {
    dispatch(register(user));
  };

  if (auth.status === REGISTER_SUCCEEDED) {
    dispatch(fetchSelf());
    alert('Registration successful');
  } else if (auth.status === LOGGED_IN)
    return <Redirect to="/home" />;

  return (
    <div className={s.register}>
      <Layout cols={1}>
        <Header text="Finish your registration" />
        <RegisterForm
          onRegister={user => registerUser(user)}
        />
      </Layout>
    </div>
  );
};
export default Register;
