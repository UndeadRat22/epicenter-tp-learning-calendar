import React from 'react';
import './SignIn.global.scss';
import { Layout } from 'wix-style-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/actions';
import Header from '../components/public/Header';
import InputFormContainer from '../components/public/signIn/signInForm';
import { BACKEND_API_URL } from '../constants/URL';

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
    <div className="signin">
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
