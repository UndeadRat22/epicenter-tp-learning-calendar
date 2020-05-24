import React from 'react';
import { useDrag } from 'react-dnd';
import { Text } from 'wix-style-react';
import s from './styles.scss';
import { TOPIC } from '../../constants/DraggableTypes';

const Topic = ({ topic }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { topic, type: TOPIC },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={isDragging ? s.draggedTopic : s.topic} ref={drag}>
      <Text>
        {topic.subject}
      </Text>
    </div>
  );
};

export default Topic;
