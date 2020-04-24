import React from 'react';
import './SignUp.global.scss';
import { Layout } from 'wix-style-react';
import Header from '../components/public/Header';
import InputFormContainer from '../components/public/signUp/signUpForm';
import { BACKEND_API_URL } from '../constants/URL';

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
    <div className="signup">
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
