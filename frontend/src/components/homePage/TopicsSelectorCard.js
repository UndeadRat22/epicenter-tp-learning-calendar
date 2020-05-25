import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Selector, Checkbox,
} from 'wix-style-react';
import SelectTopicForm from '../topicsPage/SelectTopicForm';
import EditableSelector from '../EditableSelector/EditableSelector';

const TopicsSelectorCard = () => {
  const [options, setOptions] = useState([{ title: 'Pumpkin Seeds' }, { title: 'Sunflower Seeds' }]);

  return (
    <Container>
      <Row>
        <Col span={4}>
          <Card>
            <Card.Content size="medium">ha!</Card.Content>
            <Card.Divider />
            <Card.Content>
              <EditableSelector
                toggleType="checkbox"
                title="Topics"
                options={options}
              />
            &nbsp;
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TopicsSelectorCard;
