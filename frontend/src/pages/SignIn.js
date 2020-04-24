import React from 'react';
import './SignIn.global.scss';
import { Layout } from 'wix-style-react';
import { useDispatch } from 'react-redux';
import Cookie from 'js-cookie';
import { setUser } from '../state/actions';
import Header from '../components/signInComponents/Header';
import InputFormContainer from '../components/signInComponents/InputFormContainer';

const SignIn = ({ onLogin }) => {
  const dispatch = useDispatch();

  const handleSignIn = (user, history) => {
    fetch('https://c5cddfe5.ngrok.io/api/Authentication/login', {
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
        else
          alert('ERROR: ', response.status);
      })
      .catch(err => console.log(err));
  };

  const confirmUser = async (response, history) => {
    // To store the token we can use cookies. At this moment token is stored in a state (it's not safe)
    // GET token from cookies
    // const token =  Cookie.get("token") ? Cookie.get("token") : null;
    // SET a cookie
    // Cookie.set("token", await response);
    dispatch(setUser(await response));
    onLogin();
    history.push('/home');
  };

  return (
    <div className="login">
      <Layout cols={1}>
        <Header />
        <InputFormContainer
          onLoginUser={(user, history) => handleSignIn(user, history)}
        />
      </Layout>
    </div>
  );
};

export default SignIn;
