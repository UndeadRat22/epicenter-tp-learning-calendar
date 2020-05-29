import React, { useState } from 'react';
import * as dates from 'date-arithmetic';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'wix-style-react';
import { getOnlyLocalDate, getLocalIsoString, isTodayOrInFuture } from '../../utils/dateParser';
import AddLearningDayButton from './AddLearningDayButton';
import { isSelfLearningDay, getSelfLearningDayFromDate, getTeamLearningDaysFromDate } from '../../utils/learningDay';
import {
  suspendStartLearningDay, getLearningDays, getLimits, updateLearningDay,
} from '../../state/actions';
import TopicsSelectorCard from './TopicsSelectorCard';
import {
  LOADING_UPDATE_LEARNING_DAY, LOADING_FETCH_LEARNING_DAYS, FETCH_LEARNING_DAYS_FAILED, UPDATE_LEARNING_DAY_SUCCEEDED, UPDATE_LEARNING_DAY_FAILED,
} from '../../constants/LearningDaysStatus';
import FeatureToggles from '../../utils/FeatureToggles';
import { LOADING_FETCH_LIMITS, FETCH_LIMITS_FAILED } from '../../constants/LimitsStatus';
import { LOADING_ALL_TOPICS, FETCH_ALL_TOPICS_FAILED } from '../../constants/AllTopicsStatus';

const LearningDay = ({
  date, accessors, allDayAccessors, dayPropGetter, drillDownView, getNow, onView, onSelectSlot, onNavigate, events,
}) => {
  const {
    selfLearningDays, teamLearningDays, updateStatus, status: getLearningDaysStatus,
  } = useSelector(state => state.learningDays);
  const { status: topicsStatus } = useSelector(state => state.allTopics);
  const { assignedLimit, remainingLimit, status: limitsStatus } = useSelector(state => state.limits);

  const dispatch = useDispatch();

  if (getLearningDaysStatus === LOADING_FETCH_LEARNING_DAYS || limitsStatus === LOADING_FETCH_LIMITS
    || topicsStatus === LOADING_ALL_TOPICS) {
    return (
      <div style={{ textAlign: 'center' }}><Loader size="medium" /></div>
    );
  }

  if (limitsStatus === FETCH_LIMITS_FAILED || getLearningDaysStatus === FETCH_LEARNING_DAYS_FAILED
      || topicsStatus === FETCH_ALL_TOPICS_FAILED)
    return <div style={{ textAlign: 'center' }}>Something went wrong. Try refreshing page</div>;

  const shouldDisplayLearningDayButton = !isSelfLearningDay(date, selfLearningDays)
    && (isTodayOrInFuture(date) || FeatureToggles.isOn('add-past-learning-day'));

  const commentsDisabled = (!isTodayOrInFuture(date) && !FeatureToggles.isOn('edit-past-day-comments'))
    || updateStatus === LOADING_UPDATE_LEARNING_DAY;
  const editTopicsDisabled = (!isTodayOrInFuture(date) && !FeatureToggles.isOn('edit-past-day-topics'))
    || updateStatus === LOADING_UPDATE_LEARNING_DAY;
  const checkBoxesDisabled = updateStatus === LOADING_UPDATE_LEARNING_DAY;

  const selfLearningDay = getSelfLearningDayFromDate(date, selfLearningDays);

  const onLearningDayUpdate = (learningDayId, employee) => {
    return ({ comments, newTopics }) => {
      dispatch(updateLearningDay({
        learningDayId, comments, date, learningDayTopics: newTopics, employee,
      }));
    };
  };

  const applicableTeamLearningDays = getTeamLearningDaysFromDate(date, teamLearningDays);

  return (
    <>
      {shouldDisplayLearningDayButton
    && <AddLearningDayButton date={date} disabled={remainingLimit.daysPerQuarter <= 0} />}
      {isSelfLearningDay(date, selfLearningDays)
        && (
        <TopicsSelectorCard
          editTopicsDisabled={editTopicsDisabled}
          commentsDisabled={commentsDisabled}
          checkBoxesDisabled={checkBoxesDisabled}
          addTopicDisabled={editTopicsDisabled}
          onSave={onLearningDayUpdate(selfLearningDay.id, selfLearningDay.employee)}
          topics={selfLearningDay.topics}
          employee={selfLearningDay.employee}
          isSelf
          maxTopics={assignedLimit.topicsPerDay}
          initialComments={selfLearningDay.comments}
          learningDayId={selfLearningDay.id}
        />
        )}
      {
          applicableTeamLearningDays.map(teamLearningDay => {
            return (
              <TopicsSelectorCard
                learningDayId={teamLearningDay.id}
                key={teamLearningDay.id}
                editTopicsDisabled
                addTopicDisabled
                commentsDisabled={commentsDisabled}
                checkBoxesDisabled
                onSave={onLearningDayUpdate(teamLearningDay.id, teamLearningDay.employee)}
                topics={teamLearningDay.topics}
                employee={teamLearningDay.employee}
                maxTopics={assignedLimit.topicsPerDay}
                initialComments={teamLearningDay.comments}
              />
            );
          })
        }
    </>
  );
};

LearningDay.navigate = (date, action) => {
  switch (action) {
    case 'PREV':
      return dates.add(date, -1, 'day');

    case 'NEXT':
      return dates.add(date, 1, 'day');

    default:
      return date;
  }
};

LearningDay.title = date => {
  return getOnlyLocalDate(date);
};

export default LearningDay;
