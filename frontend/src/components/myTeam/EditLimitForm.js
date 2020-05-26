import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  NumberInput,
  Cell,
  Row,
  Col,
  Container,
  Card,
  FormField,
} from 'wix-style-react';
import { useDispatch } from 'react-redux';
import { showErrorToast } from '../../state/actions/toast';

const EditTopicForm = ({ onEdit, limit }) => {
  const dispatch = useDispatch();
  const [learningDaysPerQuarter, setLearningDaysPerQuarter] = useState(limit.learningDaysPerQuarter);

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
    if (learningDaysPerQuarter !== null) {
      if (Number.isInteger(learningDaysPerQuarter) && learningDaysPerQuarter >= 0) {
        if (learningDaysPerQuarter !== limit.learningDaysPerQuarter)
          onEdit({ learningDaysPerQuarter });
        else
          dispatch(showErrorToast('Change something! :)'));
      } else
        dispatch(showErrorToast('Learning Days per Quarter must be an integer equal to or greater than 0!'));
    } else
      dispatch(showErrorToast('Learning Days per Quarter cannot be empty!'));
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
                    <FormField label="Learning Days per Quarter">
                      <NumberInput
                        min={0}
                        value={learningDaysPerQuarter}
                        onChange={value => setLearningDaysPerQuarter(value)}
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
