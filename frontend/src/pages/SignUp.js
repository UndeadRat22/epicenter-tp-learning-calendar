import React from 'react';
import { Layout } from 'wix-style-react';
import { useHistory } from 'react-router';
import Header from '../components/auth/Header';
import SignUpForm from '../components/auth/signUpForm';
import { BACKEND_API_URL } from '../constants/URL';
import s from './SignUp.scss';

// TODO: rename to Register
const SignUp = () => {
  const history = useHistory();

  const registerUser = user => {
    fetch(`${BACKEND_API_URL}/api/Authentication/register`, {
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
        <SignUpForm
          onRegister={user => registerUser(user)}
        />
      </Layout>
    </div>
  );
};
export default SignUp;
