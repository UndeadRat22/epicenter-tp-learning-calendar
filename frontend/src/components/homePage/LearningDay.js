import React, { useState } from 'react';
import moment from 'moment';
import * as dates from 'date-arithmetic';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'wix-style-react';
import { getOnlyLocalDate, getLocalIsoString, isTodayOrInFuture } from '../../utils/dateParser';
import AddLearningDayButton from './AddLearningDayButton';
import { isSelfLearningDay, getSelfLearningDayFromDate } from '../../utils/learningDay';
import {
  suspendStartLearningDay, getLearningDays, getLimits, updateLearningDay,
} from '../../state/actions';
import TopicsSelectorCard from './TopicsSelectorCard';
import { LOADING_UPDATE_LEARNING_DAY, LOADING_FETCH_LEARNING_DAYS } from '../../constants/LearningDaysStatus';

const LearningDay = ({
  date, accessors, allDayAccessors, dayPropGetter, drillDownView, getNow, onView, onSelectSlot, onNavigate, events,
}) => {
  const {
    selfLearningDays, teamLearningDays, updateStatus, status: getLearningDaysStatus,
  } = useSelector(state => state.learningDays);
  const { assignedLimit, remainingLimit } = useSelector(state => state.limits);

  const dispatch = useDispatch();

  if (updateStatus === LOADING_UPDATE_LEARNING_DAY || getLearningDaysStatus === LOADING_FETCH_LEARNING_DAYS) {
    return (
      <div style={{ textAlign: 'center' }}><Loader size="medium" /></div>
    );
  }

  if (!isSelfLearningDay(date, selfLearningDays) && isTodayOrInFuture(date))
    return <AddLearningDayButton date={date} disabled={remainingLimit.daysPerQuarter === 0} />;

  if (!isSelfLearningDay(date, selfLearningDays)) {
    // should display team members learning days
    return null;
  }

  const onLearningDayUpdate = learningDayId => {
    return ({ comments, newTopics }) => dispatch(updateLearningDay({
      learningDayId, comments, date: getLocalIsoString(date), learningDayTopics: newTopics,
    }));
  };

  const selfLearningDay = getSelfLearningDayFromDate(date, selfLearningDays);

  return (
    <TopicsSelectorCard
      onSave={onLearningDayUpdate(selfLearningDay.id)}
      topics={selfLearningDay.topics}
      employee={selfLearningDay.employee}
      isSelf
      maxTopics={assignedLimit.topicsPerDay}
      initialComments={
        selfLearningDay.comments
      }
    />
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
