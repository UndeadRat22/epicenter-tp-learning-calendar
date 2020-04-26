import React from 'react';
import { Layout } from 'wix-style-react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/auth/Header';
import SignUpForm from '../components/auth/signUpForm';
import s from './SignUp.scss';
import { register, fetchSelf } from '../state/actions/auth';
import { LOGGED_IN, REGISTER_SUCCEEDED } from '../constants/AuthStatus';

// TODO: rename to Register
const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const registerUser = user => {
    dispatch(register(user));
  };

  if (auth.status === REGISTER_SUCCEEDED) {
    dispatch(fetchSelf());
    alert('Registration successful');
  } else if (auth.status === LOGGED_IN)
    history.push('/');

  return (
    <div className={s.signup}>
      <Layout cols={1}>
        <Header text="Finish your registration" />
        <SignUpForm
          onRegister={user => registerUser(user)}
        />
      </Layout>
    </div>
  );
};
export default SignUp;
