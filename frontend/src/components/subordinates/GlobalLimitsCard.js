import React, { useState } from 'react';
import {
  Container, Row, Col, Card, NumberInput, Text,
} from 'wix-style-react';
import { useSelector } from 'react-redux';

const GlobalLimitsCard = () => {
  const { daysPerQuarter } = useSelector(state => state.limits.assignedLimit);

  const [learningDaysPerQuarter, setLearningDaysPerQuarter] = useState(daysPerQuarter);

  return (
    <Card>
      <Card.Header title="Global limits" />
      <Card.Content>
        <Container>
          <Row>
            <Col span={6}>
              <Text>Learning Days per Quarter</Text>
            </Col>
            <Col span={6}>
              <NumberInput value={learningDaysPerQuarter} onChange={value => setLearningDaysPerQuarter(value)} />
            </Col>
          </Row>
        </Container>
      </Card.Content>
    </Card>
  );
};

export default GlobalLimitsCard;
