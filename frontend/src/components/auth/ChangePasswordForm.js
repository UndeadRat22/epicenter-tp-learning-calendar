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
import ErrorNotification from '../ErrorNotification';

const ChangePasswordForm = ({ onChange }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter')
        handleChangePasswordBtn();
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const handleChangePasswordBtn = () => {
    if (oldPassword !== '' && newPassword !== '' && confirmedPassword !== '') {
      if (confirmedPassword === newPassword) {
        const passwords = {
          oldPassword,
          newPassword,
        };
        onChange(passwords);
      } else
        setShowNotification(true);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col span="3" />
        <Col span="6">
          <Card>
            <Card.Content>
              <Container fluid>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Old password">
                        <Input
                          type="password"
                          onChange={event => setOldPassword(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="New password">
                        <Input
                          type="password"
                          onChange={event => setNewPassword(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Confirm new password">
                        <Input
                          type="password"
                          onChange={event => setConfirmedPassword(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
              </Container>
            </Card.Content>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box align="right">
            <Button
              as="button"
              onClick={() => handleChangePasswordBtn()}
            >
              Change
            </Button>
          </Box>
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

export default ChangePasswordForm;
