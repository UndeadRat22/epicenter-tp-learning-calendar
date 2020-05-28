import React from 'react';
import { Heading, StatusIndicator } from 'wix-style-react';
import GoalTag from './GoalTag';

const TopicsSection = ({ isLoading, topics, title }) => {
  return (
    <div>
      <Heading appearance="H5">{title}</Heading>
      {isLoading ? <StatusIndicator status="loading" message="Loading goals" />
        : topics.map(topic => <GoalTag key={topic.id} label={topic.subject} id={topic.id} />)}
    </div>
  );
};

export default TopicsSection;
