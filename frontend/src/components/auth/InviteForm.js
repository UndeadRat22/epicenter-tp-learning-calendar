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

// TODO: introduce roles as a dropdown if we have time left
const InviteForm = ({ onInvite }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [role, setRole] = useState('');

  const handleInviteBtn = () => {
    const user = {
      firstName,
      lastName,
      email,
      // role,
    };
    onInvite(user);
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
                      <FormField label="First Name" required>
                        <Input
                          onChange={event => setFirstName(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Last Name" required>
                        <Input
                          onChange={event => setLastName(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Email" required>
                        <Input
                          onChange={event => setEmail(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <Cell>
                      <FormField label="Role">
                        <Input
                          onChange={event => setRole(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row> */}
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
              onClick={() => handleInviteBtn()}
            >
              Invite
            </Button>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};
export default InviteForm;
