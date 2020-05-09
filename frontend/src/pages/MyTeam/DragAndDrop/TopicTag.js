import React from 'react';

const style = {
  backgroundColor: 'lightgray',
  borderRadius: '2px',
  padding: '4px',
  marginTop: '4px',
  marginRight: '4px',
};

const TopicTag = ({ goalTopic }) => {
  return (
    <div style={style}>
      {goalTopic.topic}
    </div>
  );
};

export default TopicTag;
