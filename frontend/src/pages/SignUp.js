import React from 'react';
import { Layout } from 'wix-style-react';
import Header from '../components/auth/Header';
import InputFormContainer from '../components/auth/signUpForm';
import { BACKEND_API_URL } from '../constants/URL';
import s from './SignUp.scss';

const SignUp = () => {
  const registerUser = (user, history) => {
    fetch(BACKEND_API_URL.concat('/api/Authentication/register'), {
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
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={s.signup}>
      <Layout cols={1}>
        <Header text="Finish your registration" />
        <InputFormContainer
          onRegister={(user, history) => registerUser(user, history)}
        />
      </Layout>
    </div>
  );
};
export default SignUp;
