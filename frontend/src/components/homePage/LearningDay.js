import React, { useState } from 'react';
import * as dates from 'date-arithmetic';
import { useDispatch, useSelector } from 'react-redux';
import { getOnlyLocalDate } from '../../utils/dateParser';
import AddLearningDayButton from './AddLearningDayButton';
import { isSelfLearningDay } from '../../utils/learningDay';
import { suspendStartLearningDay, getLearningDays, getLimits } from '../../state/actions';

const LearningDay = ({
  date, accessors, allDayAccessors, dayPropGetter, drillDownView, getNow, onView, onSelectSlot, onNavigate, events,
}) => {
  const dispatch = useDispatch();
  const { selfLearningDays, teamLearningDays, status: learningDaysStatus } = useSelector(state => state.learningDays);
  const { assignedLimit, remainingLimit, status: limitsStatus } = useSelector(state => state.limits);

  if (!isSelfLearningDay(date, selfLearningDays))
    return <AddLearningDayButton date={date} disabled={remainingLimit.daysPerQuarter === 0} />;

  return null;
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
