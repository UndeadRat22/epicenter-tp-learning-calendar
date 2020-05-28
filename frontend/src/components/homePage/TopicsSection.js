import React from 'react';
import { Heading, StatusIndicator } from 'wix-style-react';
import ArrowUp from 'wix-ui-icons-common/ArrowUp';
import GoalTag from './GoalTag';
import CustomTag from '../CustomTag/CustomTag';
import s from './GoalTag.scss';

const TopicsSection = ({ isLoading, topics, title }) => {
  const onIconClick = id => {
    alert(id);
  };

  return (
    <div>
      <Heading appearance="H5">{title}</Heading>
      {isLoading ? <StatusIndicator status="loading" message="Loading topics" />
        : topics.map(topic => (
          <CustomTag
            key={topic.id}
            onRemove={onIconClick}
            getIcon={() => <ArrowUp />}
            className={s.tag}
            id={topic.id}
            removable
            size="medium"
            theme="dark"
          >
            {topic.subject}
          </CustomTag>
        ))}
    </div>
  );
};

export default TopicsSection;
