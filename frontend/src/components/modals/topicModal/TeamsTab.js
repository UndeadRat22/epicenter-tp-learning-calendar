import React from 'react';
import {
  Layout, Text, Box, Avatar, Badge, Tooltip,
} from 'wix-style-react';
import { LEARNED, PLANNED } from '../../../constants/ProgressStatus';
import s from './styles.scss';

const TeamsTab = ({ topic }) => {
  const teams = topic.teams || [];
  const learned = teams.filter(item => item.status === LEARNED);
  const planned = teams.filter(item => item.status === PLANNED);
  const mergedTeams = learned.concat(planned);

  return (
    <Layout cols={1}>
      {mergedTeams.length !== 0 ? (
        mergedTeams.map(item => (
          <Box align="space-between">
            <Box key={item.id} align="left" verticalAlign="middle">
              <span className={s.avatar}>
                <Avatar name={item.managerFullName} />
              </span>
              <Text size="medium">
                {' '}
                {item.managerFullName}
                {' '}
                team
              </Text>
            </Box>
            <Box maxWidth="150px" align="right" verticalAlign="middle">
              <Box>
                <Tooltip fixed appendTo="scrollParent" content="Learned / All">
                  <Badge>
                    {item.learnedCount}
                    /
                    {item.totalCount}
                  </Badge>
                </Tooltip>
              </Box>
              {item.status === LEARNED ? (
                <Badge skin="neutralSuccess">
                  LEARNED
                </Badge>
              ) : (
                <Badge skin="warningLight">
                  PLANNED
                </Badge>
              )}
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
