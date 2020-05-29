import React from 'react';
import { Heading, StatusIndicator } from 'wix-style-react';
import ArrowDown from 'wix-ui-icons-common/ArrowDown';
import { useDispatch } from 'react-redux';
import s from './GoalTag.scss';
import CustomTag from '../CustomTag/CustomTag';
import { markGoalLearned } from '../../state/actions';
import FeatureToggles from '../../utils/FeatureToggles';

const GoalsSection = ({ isLoading, goals, title }) => {
  const dispatch = useDispatch();

  const onIconClick = id => {
    dispatch(markGoalLearned(id));
  };

  // don't `id` prop, because that's what goes into onIconClick
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
              id={goal.topic.id}
              removable={FeatureToggles.isOn('mark-goal-as-complete')}
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
