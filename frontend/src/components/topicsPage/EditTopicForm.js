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
import SelectTopicForm from './SelectTopicForm';

const EditTopicForm = ({ onEdit, topic }) => {
  const [parentTopicId, setParentTopicId] = useState(topic.parentId);
  const [subject, setSubject] = useState(topic.subject);
  const [description, setDescription] = useState(topic.description);

  const topicId = topic.id;

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter')
        handleEditBtn();
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const handleEditBtn = () => {
    const editedTopic = {
      parentTopicId,
      topicId,
      subject,
      description,
    };
    onEdit(editedTopic);
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
                    <SelectTopicForm title="Select parent topic" onSelectTopic={selectedTopic => setParentTopicId(selectedTopic)} parentTopic={topic.parentSubject || ''} />
                  </Cell>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Cell>
                    <FormField label="Subject">
                      <Input
                        value={subject}
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
                        value={description}
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
              onClick={() => handleEditBtn()}
            >
              Confirm
            </Button>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTopicForm;
