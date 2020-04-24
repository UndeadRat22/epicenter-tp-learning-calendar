import React from 'react';
import { Layout } from 'wix-style-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/actions';
import Header from '../components/auth/Header';
import InputFormContainer from '../components/auth/signInForm';
import { BACKEND_API_URL } from '../constants/URL';
import s from './SignIn.scss';

const SignIn = ({ onSignIn }) => {
  const dispatch = useDispatch();

  const handleSignIn = (user, history) => {
    fetch(BACKEND_API_URL.concat('/api/Authentication/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (response.status === 200)
          confirmUser(response.json(), history);
        else if (response.status === 401)
          alert('Incorrent email or password!');
      })
      .catch(err => console.log(err));
  };

  const confirmUser = async (response, history) => {
    dispatch(setUser(await response));
    onSignIn();
    history.push('/home');
  };

  return (
    <div className={s.signin}>
      <Layout cols={1}>
        <Header text="Log in to get going" />
        <InputFormContainer
          onSignInUser={(user, history) => handleSignIn(user, history)}
        />
      </Layout>
    </div>
  );
};

export default SignIn;
