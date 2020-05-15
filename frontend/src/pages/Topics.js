import React, { useState } from 'react';
import {
  Page, Tabs, Row, Col, Box, Button,
} from 'wix-style-react';
import Add from 'wix-ui-icons-common/Add';
import { PAGE_HEIGHT } from '../constants/Styling';
import TopicsTree from '../components/topicsPage/TopicsTree';
import Topic from '../components/topicsPage/Topic';
import CreateTopicModal from '../components/modals/CreateTopicModal';

const Topics = () => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [selectedNode, setSelectedNode] = useState('');
  const [isOpenedCreateTopicModal, setIsOpenedCreateTopicModal] = useState(false);

  const changeTab = value => {
    setActiveTabId(value.id);
  };

  const handleSelectedNode = node => {
    setSelectedNode(node);
    setActiveTabId(2);
  };

  const tabToRender = () => {
    let tab;
    if (activeTabId === 1)
      tab = <TopicsTree onNodeClick={node => handleSelectedNode(node)} />;
    else if (activeTabId === 2)
      tab = <Topic topic={selectedNode} />;
    return tab;
  };

  return (
    <Page height={PAGE_HEIGHT}>
      <Page.Header title="All topics" />
      <Page.Tail>
        <Row>
          <Col>
            <Box align="left">
              <Tabs
                activeId={activeTabId}
                hasDivider={false}
                onClick={changeTab}
                items={[
                  { id: 1, title: 'Topics tree' },
                  { id: 2, title: 'Topic' },
                ]}
              />
            </Box>
            <Box align="right">
              <Button
                size="medium"
                prefixIcon={<Add />}
                skin="premium"
                onClick={() => setIsOpenedCreateTopicModal(true)}
              >
                Create new topic
              </Button>
            </Box>
          </Col>
        </Row>
      </Page.Tail>
      <Page.Content>
        {tabToRender()}
        <CreateTopicModal isModalOpened={isOpenedCreateTopicModal} onCloseModal={() => setIsOpenedCreateTopicModal(false)} />
      </Page.Content>
    </Page>
  );
};

export default Topics;
