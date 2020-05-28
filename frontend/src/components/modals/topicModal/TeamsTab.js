import React from 'react';
import {
  Layout, Text, Divider, Avatar, Box, Badge,
} from 'wix-style-react';
import { LEARNED } from '../../../constants/ProgressStatus';
import s from './styles.scss';

const TeamsTab = ({ topic }) => {
  const teams = topic.teams || [];
  const getTeams = () => {
    return teams.filter(item => item.progressStatus === LEARNED);
  };

  return (
    <Layout cols={1}>
      <Text skin="premium" size="medium" weight="normal">
        Teams have already learned this topic:
      </Text>
      <Divider />
      {getTeams().map(item => (
        <Box align="space-between">
          <Box align="left" verticalAlign="middle">
            <span className={s.avatar}>
              <Avatar name={item.managerFullName} />
            </span>
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
