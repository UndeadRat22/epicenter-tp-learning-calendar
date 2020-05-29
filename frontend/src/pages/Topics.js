import React, { useState } from 'react';
import {
  Page, Tabs, Row, Col, Box,
} from 'wix-style-react';
import TreeTab from '../components/topicsPage/TreeTab';
import AllTopicsTab from '../components/topicsPage/AllTopicsTab';

const Topics = () => {
  const [activeTabId, setActiveTabId] = useState(1);

  const changeTab = value => {
    setActiveTabId(value.id);
  };

  const tabToRender = () => {
    let tab;
    if (activeTabId === 1)
      tab = <TreeTab />;
    else if (activeTabId === 2)
      tab = <AllTopicsTab />;
    return tab;
  };

  return (
    <Page height="1300px">
      <Page.Header title="Topics" />
      <Page.Tail>
        <Row>
          <Col>
            <Box align="left">
              <Tabs
                activeId={activeTabId}
                hasDivider={false}
                onClick={changeTab}
                items={[
                  { id: 1, title: 'Tree' },
                  { id: 2, title: 'All topics' },
                ]}
              />
            </Box>
          </Col>
        </Row>
      </Page.Tail>
      <Page.Content>
        {tabToRender()}
      </Page.Content>
    </Page>
  );
};

export default Topics;
