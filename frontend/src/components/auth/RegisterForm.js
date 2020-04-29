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

const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  const { invitationId } = useParams();

  const handleRegisterBtn = () => {
    if (confirmedPassword === password) {
      const user = {
        invitationId,
        password,
        // 'Name': name,
        // 'LastName': lastName,
        // 'photo': photo,
      };
      onRegister(user);
    } else
      alert('Passwords do not match!');
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
                      <FormField label="Name" required>
                        <Input onChange={event => setName(event.target.value)} />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Last name" required>
                        <Input onChange={event => setLastName(event.target.value)} />
                      </FormField>
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
