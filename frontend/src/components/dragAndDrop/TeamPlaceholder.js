import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Box, Text,
} from 'wix-style-react';
import { TOPIC } from '../../constants/DraggableTypes';

const Employee = () => {
  // const dispatch = useDispatch();
  // const handleAssignGoal = topic => dispatch(assignGoal({ employeeId: employee.id, topic }));

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: TOPIC,
    // drop: item => {
    // if (!employee.goalTopics.some(goalTopic => goalTopic.topicId === item.topic.id))
    // handleAssignGoal({ topicId: item.topic.id, topic: item.topic.subject });
    // },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div ref={drop}>
      <Box borderColor="B50" backgroundColor="B50" visibility={canDrop ? 'visible' : 'hidden'}>
        <Text>
          Drop topic here to assign it to whole team
        </Text>
      </Box>
    </div>
  );
};

export default Employee;
