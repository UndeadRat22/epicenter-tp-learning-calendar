import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  InputWithLabel,
  Cell,
  Row,
  Col,
  Container,
  Card,
} from 'wix-style-react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter')
        handleLoginBtn();
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const handleLoginBtn = () => {
    if (email !== '' && password !== '') {
      const user = {
        email,
        password,
      };
      onLogin(user);
    }
  };

  return (
    <Container>
      <Row>
        <Col span="3" />
        <Col span="6">
          <Card>
            <Card.Content>
              <Container fluid>
                <Row>
                  <Col>
                    <Cell>
                      <InputWithLabel
                        label="Email"
                        onChange={event => setEmail(event.target.value)}
                      />
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <InputWithLabel
                        type="password"
                        label="Password"
                        onChange={event => setPassword(event.target.value)}
                      />
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Box align="right">
                      <Button
                        as="button"
                        onClick={() => handleLoginBtn()}
                      >
                        Login
                      </Button>
                    </Box>
                  </Col>
                </Row>
              </Container>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
