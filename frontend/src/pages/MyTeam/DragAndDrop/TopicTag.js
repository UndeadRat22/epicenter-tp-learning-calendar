import React from 'react';

const style = {
  backgroundColor: 'lightgray',
  borderRadius: '2px',
  padding: '4px',
  marginTop: '4px',
  marginRight: '4px',
};

const TopicTag = ({ topic }) => {
  return (
    <div style={style}>
      {topic.subject}
    </div>
  );
};

export default TopicTag;
