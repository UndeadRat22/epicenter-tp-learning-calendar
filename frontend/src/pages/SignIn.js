import React from 'react';
import { Layout } from 'wix-style-react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentUser } from '../state/actions';
import Header from '../components/auth/Header';
import SignInForm from '../components/auth/signInForm';
import { BACKEND_API_URL } from '../constants/URL';
import s from './SignIn.scss';
import { LOGGED_IN } from '../constants/AuthStatus';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignIn = user => {
    fetch(`${BACKEND_API_URL}/api/Authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (response.status === 200)
          confirmUser(response.json());
        else if (response.status === 401)
          alert('Incorrect email or password!');
      })
      .catch(err => console.log(err));
  };

  const confirmUser = async response => {
    const user = await response;
    dispatch(setCurrentUser({
      ...user,
      status: LOGGED_IN,
    }));
    history.push('/home');
  };

  return (
    <div className={s.signin}>
      <Layout cols={1}>
        <Header text="Log in to get going" />
        <SignInForm
          onSignInUser={user => handleSignIn(user)}
        />
      </Layout>
    </div>
  );
};

export default SignIn;
