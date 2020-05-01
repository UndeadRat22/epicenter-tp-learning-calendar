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


const InviteForm = ({ onInvite }) => {
  const [subordinateName, setSubordinateName] = useState('');
  const [subordinateLastName, setSubordinateLastName] = useState('');
  const [subordinateEmail, setSubordinateEmail] = useState('');
  const [subordinateRole, setSubordinateRole] = useState('');

  const handleInviteBtn = () => {
    const user = {
      subordinateName,
      subordinateLastName,
      subordinateEmail,
      subordinateRole,
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
                      <FormField label="Employee name" required>
                        <Input
                          onChange={event => setSubordinateName(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Employee last name" required>
                        <Input
                          onChange={event => setSubordinateLastName(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Employee email" required>
                        <Input
                          onChange={event => setSubordinateEmail(event.target.value)}
                        />
                      </FormField>
                    </Cell>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Cell>
                      <FormField label="Employee role" required>
                        <Input
                          onChange={event => setSubordinateRole(event.target.value)}
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
