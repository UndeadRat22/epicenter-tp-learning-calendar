import React from 'react';
import { useDrag } from 'react-dnd';
import { Text, Tooltip } from 'wix-style-react';
import s from './styles.scss';
import { TOPIC } from '../../constants/DraggableTypes';
import FeatureToggles from '../../utils/FeatureToggles';

const renderTopic = (isDragging, topic) => {
  if (isDragging) {
    return (
      <Text>
        {topic.subject}
      </Text>
    );
  }
  if (topic.description === '' || !FeatureToggles.isOn('topic-description-tooltip')) {
    return (
      <Text>
        {topic.subject}
      </Text>
    );
  }
  return (
    <Tooltip content={topic.description} placement="left-end">
      <Text>
        {topic.subject}
      </Text>
    </Tooltip>
  );
};

const Topic = ({ topic }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { topic, type: TOPIC },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={isDragging ? s.draggedTopic : s.topic} ref={drag}>
      {renderTopic(isDragging, topic)}
    </div>
  );
};

export default Topic;
