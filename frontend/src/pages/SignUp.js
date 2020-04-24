import React from 'react';
import './SignUp.global.scss';
import { Layout } from 'wix-style-react';
import SignUpHeader from '../components/signUpComponents/Header';
import InputFormContainer from '../components/signUpComponents/InputFormContainer';

const SignUp = () => {
  const registerUser = (user, history) => {
    fetch('https://c5cddfe5.ngrok.io/api/Authentication/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (response.status === 200) {
          alert('Registration successful');
          history.push('/');
        } else
          alert('ERROR: ', response.status);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <Layout cols={1}>
        <SignUpHeader />
        <InputFormContainer
          onRegister={(user, history) => registerUser(user, history)}
        />
      </Layout>
    </div>
  );
};
export default SignUp;
