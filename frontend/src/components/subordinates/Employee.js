import React from 'react';
import { useDrag } from 'react-dnd';
import {
  Avatar, Box, Divider, IconButton, Text,
} from 'wix-style-react';
import { MinusSmall } from 'wix-ui-icons-common';
import { EMPLOYEE } from '../../constants/DraggableTypes';
import s from './styles.scss';

const Employee = ({ employee }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { employee, type: EMPLOYEE },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const managerText = `Manager: ${employee.managerFullName}`;

  return (
    <div className={isDragging ? s.draggedEmployee : s.employee} ref={drag}>
      <Box align="space-between" verticalAlign="middle">
        <Box verticalAlign="middle">
          <Box marginRight="20px">
            <Avatar
              name={employee.fullName}
              color="A2"
              size="size36"
            />
          </Box>
          <Text>
            {employee.fullName}
          </Text>
        </Box>
        <IconButton size="tiny" skin="premium" onClick={() => console.log('deleted')}>
          <MinusSmall />
        </IconButton>
      </Box>
      <Box marginTop="8px" marginBottom="8px">
        <Divider />
      </Box>
      <Text>{managerText}</Text>
    </div>
  );
};

export default Employee;
