import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Input,
  Cell,
  Row,
  Col,
  Container,
  Card,
  FormField,
} from 'wix-style-react';
import { Route, useParams } from 'react-router-dom';
import ErrorNotification from '../ErrorNotification';

const RegisterForm = ({ onRegister }) => {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter')
        handleRegisterBtn();
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const { inviteId } = useParams();

  const handleRegisterBtn = () => {
    if (password !== '' && confirmedPassword !== '') {
      if (confirmedPassword === password) {
        const user = {
          inviteId,
          password,
        };
        onRegister(user);
      } else
        setShowNotification(true);
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
                      <FormField label="Password" required>
                        <Input
                          type="password"
                          onChange={event => setPassword(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Confirm password" required>
                        <Input
                          type="password"
                          onChange={event => setConfirmedPassword(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Box align="right">
                      <Route
                        render={() => (
                          <Button
                            as="button"
                            onClick={() => handleRegisterBtn()}
                          >
                            Finish
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
      {showNotification && (
        <ErrorNotification
          text="Passwords do not match!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </Container>
  );
};
export default RegisterForm;
