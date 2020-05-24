import React from 'react';
import { useDrag } from 'react-dnd';
import { Text, Tooltip } from 'wix-style-react';
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
      {isDragging
        ? (
          <Text>
            {topic.subject}
          </Text>
        )
        : (
          <Tooltip content="very very looong long description, we need to get this from backend :)" placement="left-end">
            <Text>
              {topic.subject}
            </Text>
          </Tooltip>
        )}
    </div>
  );
};

export default Topic;
