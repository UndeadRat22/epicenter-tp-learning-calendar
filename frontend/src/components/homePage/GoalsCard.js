import React from 'react';
import {
  EmptyState, StatusIndicator, Heading, Box,
} from 'wix-style-react';
import GoalTag from './GoalTag';

const GoalsCard = ({ notLearnedGoals, learnedGoals, isLoading }) => {
  return (
    <EmptyState
      align="start"
      title="Goals"
      theme="page"
    >
      <div>
        <Heading appearance="H5">Topics that you should consider learning</Heading>
        {isLoading ? <StatusIndicator status="loading" message="Loading goals" /> : notLearnedGoals.map(goal => <GoalTag key={goal.id} label={goal.topic.subject} id={goal.id} />)}
      </div>
    </EmptyState>
  );
};

export default GoalsCard;
