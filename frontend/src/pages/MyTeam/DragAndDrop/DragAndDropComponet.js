import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import {
  Container, Row, Col, Card, Search, Text,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTopics } from '../../../state/actions/allTopics';
import {
  LOADING_ALL_TOPICS, FETCH_ALL_TOPICS_SUCCEEDED, FETCH_ALL_TOPICS_FAILED,
} from '../../../constants/AllTopicsStatus';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Employee from './Employee';
import Topic from './Topic';

const DragAndDropComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTopics());
  }, [dispatch]);

  const { topics, status } = useSelector(state => state.allTopics);
  const employees = useSelector(state => state.employees);

  return (
    <DndProvider backend={Backend}>
      <Container>
        <Row stretchViewsVertically>
          <Col span={5}>
            <Card stretchVertically>
              <Card.Header
                title="Topics"
                suffix={(
                  <Search
                    debounceMs={250}
                    clearButton={false}
                  // TODO: filter topics
                    onChange={e => console.log(e.target.value)}
                  />
              )}
              />
              <Card.Content>
                {status === LOADING_ALL_TOPICS && <LoadingIndicator text="Loading topics..." />}
                {status === FETCH_ALL_TOPICS_SUCCEEDED && topics.map(topic => <Topic key={topic.id} topic={topic} />)}
                {status === FETCH_ALL_TOPICS_FAILED && <Text>Failed to load topics</Text>}
              </Card.Content>
            </Card>
          </Col>
          <Col span={1} />
          <Col span={6}>
            <Card stretchVertically>
              <Card.Header title="Employees" />
              <Card.Content>
                {employees.map(employee => <Employee key={employee.id} employee={employee} />)}
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default DragAndDropComponent;
