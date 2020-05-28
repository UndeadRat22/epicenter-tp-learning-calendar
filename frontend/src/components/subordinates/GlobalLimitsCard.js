import React, { useState } from 'react';
import {
  Container, Row, Col, Card, NumberInput, Text, Loader,
} from 'wix-style-react';
import { useSelector } from 'react-redux';
import { LOADING_FETCH_LIMITS, FETCH_LIMITS_SUCCEEDED } from '../../constants/LimitsStatus';

const GlobalLimitsCard = () => {
  const { status, assignedLimit } = useSelector(state => state.limits);

  const loadingFetchLimits = status === LOADING_FETCH_LIMITS;
  const fetchLimitsSucceeded = status === FETCH_LIMITS_SUCCEEDED;

  let daysPerQuarter;
  if (fetchLimitsSucceeded)
    daysPerQuarter = assignedLimit.daysPerQuarter;

  const [learningDaysPerQuarter, setLearningDaysPerQuarter] = useState(daysPerQuarter);

  return (
    <Card>
      <Card.Header title="Global limits" />
      <Card.Content>
        <Container>
          {loadingFetchLimits && (
            <Row>
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <Loader size="small" />
                </div>
              </Col>
            </Row>
          )}
          {fetchLimitsSucceeded && (
            <Row>
              <Col span={6}>
                <Text>Learning Days per Quarter</Text>
              </Col>
              <Col span={6}>
                <NumberInput value={learningDaysPerQuarter} onChange={value => setLearningDaysPerQuarter(value)} />
              </Col>
            </Row>
          )}
        </Container>
      </Card.Content>
    </Card>
  );
};

export default GlobalLimitsCard;
