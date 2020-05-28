import React from 'react';
import { Heading, StatusIndicator } from 'wix-style-react';
import GoalTag from './GoalTag';

const GoalsSection = ({ isLoading, goals, title }) => {
  return (
    <div>
      <Heading appearance="H5">{title}</Heading>
      {isLoading ? <StatusIndicator status="loading" message="Loading goals" />
        : goals.map(goal => <GoalTag key={goal.id} label={goal.topic.subject} id={goal.id} />)}
    </div>
  );
};

export default GoalsSection;
