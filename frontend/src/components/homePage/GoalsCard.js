import React from 'react';
import {
  Container, Row, Col, EmptyState, Tag,
} from 'wix-style-react';
import GoalTag from './GoalTag';

const GoalsCard = ({ goals }) => {
  return (
    <EmptyState
      align="start"
      title="Goals"
      subtitle="Topics that have been assigned to you"
      theme="page"
    >
      <div>
        {goals.map(goal => <GoalTag key={goal.id} label={goal.topic.subject} id={goal.id} />)}
      </div>
    </EmptyState>
  );
};

export default GoalsCard;
