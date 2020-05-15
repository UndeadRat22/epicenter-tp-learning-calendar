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
  InputArea,
} from 'wix-style-react';
import { INPUTAREA_MIN_HEIGHT } from '../../constants/Styling';
import ErrorNotification from '../ErrorNotification';
import SelectTopicForm from './SelectTopicForm';

const CreateNewTopicForm = ({ onCreate }) => {
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [parentTopic, setParentTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter')
        handleCreateBtn();
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const handleCreateBtn = () => {
    if (parentTopic !== '' && subject !== '' && description !== '') {
      const newTopic = {
        parentTopic,
        subject,
        description,
      };
      onCreate(newTopic);
    } else
      setShowErrorNotification(true);
  };

  return (
    <Container fluid>
      <Row>
        <Card>
          <Card.Content>
            <Container fluid>
              <Row>
                <Col>
                  <Cell>
                    <SelectTopicForm onSelectTopic={selectedTopic => setParentTopic(selectedTopic)} />
                  </Cell>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Cell>
                    <FormField label="Subject">
                      <Input
                        onChange={event => setSubject(event.target.value)}
                      />
                    </FormField>
                  </Cell>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Cell>
                    <FormField label="Description">
                      <InputArea
                        resizable
                        minHeight={INPUTAREA_MIN_HEIGHT}
                        onChange={event => setDescription(event.target.value)}
                      />
                    </FormField>
                  </Cell>
                </Col>
              </Row>
            </Container>
          </Card.Content>
        </Card>
      </Row>
      <Row>
        <Col>
          <Box align="right">
            <Button
              as="button"
              onClick={() => handleCreateBtn()}
            >
              Create
            </Button>
          </Box>
        </Col>
      </Row>
      {showErrorNotification && (
        <ErrorNotification
          text="All fields must be filled!"
          onClose={() => setShowErrorNotification(false)}
        />
      )}
    </Container>
  );
};

export default CreateNewTopicForm;
