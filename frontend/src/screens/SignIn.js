import React from 'react';
import '../App.global.scss';
import {
  Button,
  Box,
  Layout,
  Image,
  Heading,
  InputWithLabel,
  Cell,
} from 'wix-style-react';
import { Route } from 'react-router-dom';

const SignIn = props => {
  const logo = require('../img/logo.jpeg');
  const primaryColor = {
    color: '#B38A4C',
  };
  const handleSignInBtn = history => {
    props.callback();
    history.push('/home');
  };

  return (
    <div className="login">
      <Layout cols={1}>
        <Box align="center" margin="10%">
          <Layout cols={1}>
            <Image src={logo} height="200px" width="200px" />
            <Heading appearance="H1" style={primaryColor}>
              {' '}
              The Learning Center
            </Heading>
            <Heading appearance="H3"> Log in to get going</Heading>
          </Layout>
        </Box>
        <Box
          align="center"
          verticalAlign="middle"
          padding="medium"
          marginBottom={10}
          minHeight={300}
          width="90%"
          backgroundColor="white"
        >
          <Layout cols={1}>
            <Cell>
              <InputWithLabel label="Email" />
            </Cell>
            <Cell>
              <InputWithLabel label="Password" />
            </Cell>

            <Route
              render={({ history }) => (
                <Button
                  priority="secondary"
                  skin="dark"
                  fullWidth
                  as="button"
                  onClick={() => handleSignInBtn(history)}
                >
                  Login
                </Button>
              )}
            />
          </Layout>
        </Box>
      </Layout>
    </div>
  );
};
export default SignIn;
