import React from 'react';
import {
  Layout, Text, Divider, Box, Avatar,
} from 'wix-style-react';
import { LEARNED } from '../../../constants/ProgressStatus';

const EmployeesTab = ({ topic }) => {
  const { employees } = topic;
  const getEmployees = () => {
    return employees.filter(item => item.progressStatus === LEARNED);
  };
  return (
    <Layout cols={1}>
      <Text skin="premium" size="medium" weight="normal">
        Employees have already learned this topic:
      </Text>
      <Divider />
      {getEmployees().length === 0
        ? <Text>There is no employees</Text>
        : getEmployees().map(item => (
          <Box align="left" verticalAlign="middle">
            <Avatar name={item.fullName} />
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
