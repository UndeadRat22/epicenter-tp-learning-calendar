import React from 'react';
import {
  Layout, Text, Box, Avatar, Badge,
} from 'wix-style-react';
import { useSelector } from 'react-redux';
import { LEARNED, PLANNED } from '../../../constants/ProgressStatus';
import s from './styles.scss';

const SubordinatesTab = ({ topic }) => {
  const selfUser = useSelector(state => state.auth.user);
  const subordinates = topic.subordinates || [];
  const learned = subordinates.filter(item => item.status === LEARNED);
  const planned = subordinates.filter(item => item.status === PLANNED);
  const mergedSubordinates = learned.concat(planned);
  const subordinatesWithoutSelf = mergedSubordinates.filter(subordinate => subordinate.id !== selfUser.id);

  return (
    <Layout cols={1}>
      {subordinatesWithoutSelf.length !== 0 ? (
        subordinatesWithoutSelf.map(item => (
          <Box key={item.id} align="space-between">
            <Box align="left" verticalAlign="middle">
              <span className={s.avatar}>
                <Avatar color="A2" name={item.fullName} />
              </span>
              <Text size="medium">
                {' '}
                {item.fullName}
              </Text>
            </Box>
            <Box maxWidth="150px" align="right" verticalAlign="middle">
              {item.status === LEARNED ? (
                <Badge skin="neutralSuccess">
                  LEARNED
                </Badge>
              ) : (
                <Badge skin="warningLight" size="medium">
                  PLANNED
                </Badge>
              )}
            </Box>
          </Box>
        ))
      )
        : (
          <Text size="medium" skin="premium">
            No one has planned or learned this topic!
          </Text>
        )}
    </Layout>
  );
};
export default SubordinatesTab;
