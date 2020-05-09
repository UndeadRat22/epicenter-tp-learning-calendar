import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { assignGoal } from '../../../state/actions/goals';
import TopicTag from './TopicTag';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px solid lightgrey',
  borderRadius: '2px',
  padding: '8px',
  marginBottom: '8px',
  // textAlign: 'center',
  transition: 'background-color 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
};

const Employee = ({ employee }) => {
  const dispatch = useDispatch();
  const handleAssignGoal = topic => dispatch(assignGoal({ employeeId: employee.id, topic }));

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.TOPIC,
    drop: (item, monitor) => {
      if (!employee.goalTopics.some(goalTopic => goalTopic.topicId === item.topic.id))
        handleAssignGoal({ topicId: item.topic.id, topic: item.topic.subject });


      return { name: employee.name };
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  let backgroundColor = 'white';
  if (isActive)
    backgroundColor = '#C0C0C0';
  else if (canDrop) {
    // backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {employee.name}
      {/* {isActive ? 'Release to drop' : employee.name} */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {employee.goalTopics.map(goalTopic => {
          return <TopicTag key={goalTopic.topicId} goalTopic={goalTopic} />;
        })}
      </div>
    </div>
  );
};

export default Employee;
