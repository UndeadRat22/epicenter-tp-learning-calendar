import React from 'react';
import {
  Layout, Text, Divider, Avatar, Box, Badge,
} from 'wix-style-react';
import { LEARNED } from '../../../constants/ProgressStatus';

const TeamsTab = ({ topic }) => {
  const { teams } = topic;
  const getTeams = () => {
    return teams.filter(item => item.progressStatus === LEARNED);
  };

  return (
    <Layout cols={1}>
      <Text skin="premium" size="medium" weight="normal">
        Teams have already learned this topic:
      </Text>
      <Divider />
      {getTeams().length === 0
        ? <Text>There is no teams</Text>
        : getTeams().map(item => (
          <Box align="space-between">
            <Box align="left" verticalAlign="middle">
              <Avatar name={item.managerFullName} />
              <Text size="medium">
                {' '}
                {item.managerFullName}
                {' '}
                Team
              </Text>
            </Box>
            <Box maxWidth="80px" align="right" verticalAlign="middle">
              <Badge>
                {item.learnedCount}
                /
                {item.totalCount}
              </Badge>
            </Box>
          </Box>
        ))}
    </Layout>
  );
};
export default TeamsTab;
