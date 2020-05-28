import React from 'react';
import { Heading, StatusIndicator } from 'wix-style-react';
import ArrowDown from 'wix-ui-icons-common/ArrowDown';
import s from './GoalTag.scss';
import CustomTag from '../CustomTag/CustomTag';

const GoalsSection = ({ isLoading, goals, title }) => {
  const onIconClick = id => {

  };

  return (
    <div>
      <Heading appearance="H5">{title}</Heading>
      {isLoading ? <StatusIndicator status="loading" message="Loading goals" />
        : goals
          .map(goal => (
            <CustomTag
              onRemove={onIconClick}
              key={goal.id}
              getIcon={() => <ArrowDown />}
              className={s.tag}
              id={goal.id}
              removable
              size="medium"
              theme="dark"
            >
              {goal.topic.subject}
            </CustomTag>
          ))}
    </div>
  );
};

export default GoalsSection;
