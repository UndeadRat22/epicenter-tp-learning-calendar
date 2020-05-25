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
import { useDispatch } from 'react-redux';
import { INPUTAREA_MIN_HEIGHT } from '../../constants/Styling';
import SelectTopicForm from './SelectTopicForm';
import { showErrorToast } from '../../state/actions/toast';

const CreateNewTopicForm = ({ onCreate }) => {
  const [parentTopic, setParentTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

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
    if (subject !== '') {
      const newTopic = {
        parentTopic,
        subject,
        description,
      };
      onCreate(newTopic);
    } else
      dispatch(showErrorToast('Subject cannot be empty!'));
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
    </Container>
  );
};

export default CreateNewTopicForm;
