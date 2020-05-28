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
        <GoalsSection isLoading={isLoadingGoals} goals={notLearnedGoals} title="Topics that you should consider learning" />
        <TopicsSection isLoading={isLoadingTopics} topics={learnedTopics} title="Learned topics" />
      </div>
    </EmptyState>
  );
};

export default GoalsCard;
