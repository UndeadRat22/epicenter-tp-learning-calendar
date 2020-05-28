import React from 'react';
import {
  EmptyState,
} from 'wix-style-react';
import GoalsSection from './GoalsSection';
import TopicsSection from './TopicsSection';

const GoalsCard = ({
  notLearnedGoals, learnedTopics, isLoadingGoals, isLoadingTopics,
}) => {
  return (
    <EmptyState
      align="start"
      title="Goals"
      theme="page"
    >
      <div>
        <div style={{ marginBottom: 12 }}>
          <GoalsSection isLoading={isLoadingGoals} goals={notLearnedGoals} title="Topics that you should consider learning" />
        </div>
        <TopicsSection isLoading={isLoadingTopics} topics={learnedTopics} title="Learned topics" />
      </div>
    </EmptyState>
  );
};

export default GoalsCard;
