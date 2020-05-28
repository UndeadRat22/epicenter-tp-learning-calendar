import React from 'react';
import {
  Layout, Text, Divider, Box, Avatar,
} from 'wix-style-react';
import { LEARNED } from '../../../constants/ProgressStatus';
import s from './styles.scss';

const EmployeesTab = ({ topic }) => {
  const employees = topic.employees || [];
  const getEmployees = () => {
    return employees.filter(item => item.progressStatus === LEARNED);
  };
  return (
    <Layout cols={1}>
      <Text skin="premium" size="medium" weight="normal">
        Employees that have already learned this topic:
      </Text>
      <Divider />
      {getEmployees().map(item => (
        <Box key={item.id} align="left" verticalAlign="middle">
          <span className={s.avatar}>
            <Avatar name={item.fullName} />
          </span>
          <Text size="medium">
            {' '}
            {item.fullName}
          </Text>
        </Box>
      ))}
    </Layout>
  );
};
export default EmployeesTab;
