import React, { useState } from 'react';
import './SignInForm.global.scss';
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
import { Route } from 'react-router-dom';

const InputFormContainer = ({ onSignInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInBtn = history => {
    const user = {
      Email: email,
      Password: password,
    };
    onSignInUser(user, history);
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
                      <Route
                        render={({ history }) => (
                          <Button
                            as="button"
                            onClick={() => handleSignInBtn(history)}
                          >
                            Login
                          </Button>
                        )}
                      />
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

export default InputFormContainer;
