import React from 'react';
import {
  Layout, Text, Box, Avatar, Badge, Tooltip,
} from 'wix-style-react';
import { useSelector } from 'react-redux';
import { LEARNED, PLANNED } from '../../../constants/ProgressStatus';
import s from './styles.scss';

const TeamsTab = ({ topic }) => {
  const teams = topic.teams || [];
  const learned = teams.filter(item => item.status === LEARNED);
  const planned = teams.filter(item => item.status === PLANNED);
  const mergedTeams = learned.concat(planned);
  const selfUser = useSelector(state => state.auth.user);

  return (
    <Layout cols={1}>
      {mergedTeams.length !== 0 ? (
        mergedTeams.map(item => (
          <Box key={item.teamId} align="space-between">
            <Box align="left" verticalAlign="middle">
              <span className={s.avatar}>
                <Avatar color={selfUser.id === item.managerId ? 'A1' : 'A2'} name={item.managerFullName} />
              </span>
              <Text size="medium" weight={selfUser.id === item.managerId ? 'bold' : 'thin'}>
                {' '}
                {item.managerFullName}
              </Text>
            </Box>
            <Box maxWidth="150px" align="right" verticalAlign="middle">
              <Badge skin="warningLight">
                {item.plannedCount}
                {' '}
                PLANNED
              </Badge>
              <Badge skin="neutralSuccess">
                {item.learnedCount}
                {' '}
                LEARNED
              </Badge>
              <Badge>
                {item.totalCount}
                {' '}
                TOTAL
              </Badge>
            </Box>
          </Box>
        ))
      )
        : (
          <Text size="medium" skin="premium">
            No teams learned or planned this topic!
          </Text>
        )}
    </Layout>
  );
};
export default TeamsTab;
