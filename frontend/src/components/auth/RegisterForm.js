import React, { useState } from 'react';
import {
  Button,
  Box,
  Layout,
  Image,
  Input,
  Cell,
  Row,
  Col,
  Container,
  Card,
  FormField,
} from 'wix-style-react';
import { Route, useParams } from 'react-router-dom';
import s from './RegisterForm.scss';
import Alert from '../Alert';

const RegisterForm = ({ onRegister }) => {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { invitationId } = useParams();

  const handleRegisterBtn = () => {
    if (confirmedPassword === password) {
      const user = {
        invitationId,
        password,
        // photo,
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
                      <Layout cols={1}>
                        <div align="center" className={s.box}>
                          <Image src={userPhoto} height="100px" width="100px" />
                        </div>
                        <div align="center">
                          <Button
                            as="button"
                            skin="premium"
                            size="small"
                          >
                            Upload profile picture
                          </Button>
                        </div>
                      </Layout>
                    </Cell>
                  </Col>
                </Row>
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
