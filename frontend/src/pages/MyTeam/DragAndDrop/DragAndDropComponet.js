import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import {
  Container, Row, Col, Card, Search,
} from 'wix-style-react';
import { useSelector } from 'react-redux';
import Employee from './Employee';
import Topic from './Topic';

const DragAndDropComponent = () => {
  const topics = useSelector(state => state.topics);
  const employees = useSelector(state => state.employees);

  return (
    <DndProvider backend={Backend}>
      <Container>
        <Row stretchViewsVertically>
          <Col span={4}>
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
                {topics.map(topic => {
                  return <Topic key={topic.id} topic={topic} />;
                })}
              </Card.Content>
            </Card>
          </Col>
          <Col span={4}>
            <Card stretchVertically>
              <Card.Header title="Employees" />
              <Card.Content>
                {employees.map(employee => {
                  return <Employee key={employee.id} employee={employee} />;
                })}
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default DragAndDropComponent;
