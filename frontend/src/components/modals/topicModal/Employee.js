import React from 'react';
import {
  Avatar, Box, Text,
} from 'wix-style-react';


const Employee = ({ employee }) => {
  // TODO: implementinti skaiciuka prie avataro su darbuotoju skaiciumi, jeigu kalbame apie komandas
  return (
    <Box align="space-between">
      <Avatar name={employee.fullName} />
      <Text>{employee.fullName}</Text>
    </Box>
  );
};
export default Employee;
