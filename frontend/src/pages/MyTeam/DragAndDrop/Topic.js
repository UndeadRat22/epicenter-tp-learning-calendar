import React from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px solid lightgrey',
  borderRadius: '2px',
  backgroundColor: 'white',
  padding: '8px',
  marginBottom: '8px',
  cursor: 'move',
};

const Topic = ({ topic }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { topic, type: ItemTypes.TOPIC },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped ${item.topic.subject} into ${dropResult.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {topic.subject}
    </div>
  );
};

export default Topic;
