import React from 'react';
import { useDrag } from 'react-dnd';
import {
  Avatar, Box, Divider, Text,
} from 'wix-style-react';
import { EMPLOYEE } from '../../constants/DraggableTypes';
import s from './styles.scss';

const Employee = ({ employee }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { employee, type: EMPLOYEE },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={isDragging ? s.draggedEmployee : s.employee} ref={drag}>
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
      {/* <Box marginTop="8px" marginBottom="8px">
        <Divider />
      </Box> */}
    </div>
  );
};

export default Employee;
