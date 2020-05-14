import React, { useState } from 'react';
import { Page, Tabs } from 'wix-style-react';
import { PAGE_HEIGHT } from '../constants/Styling';
import TopicsTree from '../components/topicsPage/TopicsTree';
import Topic from '../components/topicsPage/Topic';

const Topics = () => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [selectedNode, setSelectedNode] = useState('');

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
        <Tabs
          activeId={activeTabId}
          hasDivider={false}
          onClick={changeTab}
          items={[
            { id: 1, title: 'Topics tree' },
            { id: 2, title: 'Topic' },
          ]}
        />
      </Page.Tail>
      <Page.Content>
        {tabToRender()}
      </Page.Content>
    </Page>
  );
};

export default Topics;
