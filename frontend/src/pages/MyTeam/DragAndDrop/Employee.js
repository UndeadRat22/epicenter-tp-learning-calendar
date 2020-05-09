import React from 'react';
import { useDrop } from 'react-dnd';
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

const Employee = ({ employee, topics }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.TOPIC,
    drop: (item, monitor) => {
      if (!topics.some(topic => topic.id === item.topic.id))
        topics.push(item.topic);

      return { name: employee.firstName };
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
      {`${employee.firstName} ${employee.lastName}`}
      {/* {isActive ? 'Release to drop' : employee.firstName + ' ' + employee.lastName} */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {topics.map(topic => {
          return <TopicTag key={topic.id} topic={topic} />;
        })}
      </div>
    </div>
  );
};

export default Employee;
