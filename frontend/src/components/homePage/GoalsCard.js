import React from 'react';
import {
  EmptyState, Loader,
} from 'wix-style-react';
import GoalTag from './GoalTag';

const GoalsCard = ({ goals, isLoading }) => {
  return (
    <EmptyState
      align="start"
      title="Goals"
      subtitle="Topics that have been assigned to you"
      theme="page"
    >
      <div>
        {isLoading ? <Loader size="tiny" /> : goals.map(goal => <GoalTag key={goal.id} label={goal.topic.subject} id={goal.id} />)}
      </div>
    </EmptyState>
  );
};

export default GoalsCard;
