import React from 'react';
import {
  Layout, Text, Divider,
} from 'wix-style-react';

const TopicTab = ({ topic }) => {
  return (
    <Layout cols={1}>
      <Text skin="premium" size="medium" weight="normal">
        Parent topic:
      </Text>
      <Text size="small">
        {topic.parentSubject}
      </Text>
      <Divider />
      <Text skin="premium" size="medium" weight="normal">
        Description:
      </Text>
      <Text size="small">
        {topic.description}
      </Text>
    </Layout>
  );
};
export default TopicTab;
