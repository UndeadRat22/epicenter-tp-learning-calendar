import React, { useState } from 'react';
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
import Alert from '../Alert';

const RegisterForm = ({ onRegister }) => {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { inviteId } = useParams();

  const handleRegisterBtn = () => {
    if (confirmedPassword === password) {
      const user = {
        inviteId,
        password,
      };
      onRegister(user);
    } else
      setShowAlert(true);
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
                {showAlert && (
                  <Row>
                    <Col>
                      <Cell>
                        <Alert
                          appearance="danger"
                          header="Alert!"
                          text="Passwords do not match"
                          onClose={() => setShowAlert(false)}
                        />
                      </Cell>
                    </Col>
                  </Row>
                )}
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
    </Container>
  );
};
export default RegisterForm;
