import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Tabs,
} from 'wix-style-react';


const Topic = ({ topic }) => {
  const [activeTabId, setActiveTabId] = useState(1);

  // TODO: get info about the topic from backend (when it's gonna be implemented in backend)

  const changeTab = value => {
    setActiveTabId(value.id);
  };

  // TODO: implement tabs
  const tabToRender = () => {
    let tab;
    if (activeTabId === 1)
      tab = topic;
    else if (activeTabId === 2)
      tab = 'employees who have already learned this topic';
    else if (activeTabId === 3)
      tab = 'teams who have already learned this topic';
    return tab;
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header title="Topic" />
            <Card.Subheader
              title={(
                <Tabs
                  activeId={activeTabId}
                  hasDivider={false}
                  onClick={changeTab}
                  items={[
                    { id: 1, title: 'About' },
                    { id: 2, title: 'Employees' },
                    { id: 3, title: 'Teams' },
                  ]}
                />
            )}
            />
            <Card.Divider />
            <Card.Content>
              {tabToRender()}
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Topic;
