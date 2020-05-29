import React from 'react';
import {
  Layout, Text, Box, Avatar, Badge,
} from 'wix-style-react';
import { useSelector } from 'react-redux';
import { LEARNED, PLANNED } from '../../../constants/ProgressStatus';
import s from './styles.scss';

const EmployeesTab = ({ topic }) => {
  const employees = topic.directSubordinates || [];
  const learned = employees.filter(item => item.status === LEARNED);
  const planned = employees.filter(item => item.status === PLANNED);
  const mergedEmployees = learned.concat(planned);

  const selfUser = useSelector(state => state.auth.user);

  return (
    <Layout cols={1}>
      {mergedEmployees.length !== 0 ? (
        mergedEmployees.map(item => (
          <Box key={item.id} align="space-between">
            <Box align="left" verticalAlign="middle">
              <span className={s.avatar}>
                <Avatar color={selfUser.id === item.id ? 'A1' : 'A2'} name={item.fullName} />
              </span>
              <Text size="medium" weight={selfUser.id === item.id ? 'bold' : 'thin'}>
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
export default EmployeesTab;
