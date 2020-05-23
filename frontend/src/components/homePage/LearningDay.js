import React, { useState } from 'react';
import * as dates from 'date-arithmetic';
import { Button } from 'wix-style-react';
import Add from 'wix-ui-icons-common/Add';
import { useDispatch, useSelector } from 'react-redux';
import StartLearningDayModal from '../modals/StartLearningDayModal';
import { startLearningDay, suspendStartLearningDay } from '../../state/actions/learningDays';
import { getOnlyLocalDate } from '../../utils/dateParser';
import { START_LEARNING_DAY_SUCCEEDED, START_LEARNING_DAY_FAILED, LOADING_START_LEARNING_DAY } from '../../constants/LearningDaysStatus';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

const LearningDay = ({
  date, accessors, allDayAccessors, dayPropGetter, drillDownView, getNow, onView, onSelectSlot, onNavigate, events,
}) => {
  const status = useSelector(state => state.learningDays.startStatus);
  const dispatch = useDispatch();

  const learningDayStarted = status === START_LEARNING_DAY_SUCCEEDED;
  const learningDayFailed = status === START_LEARNING_DAY_FAILED;
  const isLoading = status === LOADING_START_LEARNING_DAY;

  const [isStartLearningDayModalOpen, setIsStartLearningDayModalOpen] = useState(false);

  const onStartLearningDay = () => {
    dispatch(startLearningDay(date));
  };

  const onSuccessNotificationEnd = () => {
    setIsStartLearningDayModalOpen(false);
    dispatch(suspendStartLearningDay());
  };

  return (
    <div style={{ margin: '0 auto' }}>
      {learningDayStarted && (
      <SuccessNotification text="Started" onClose={onSuccessNotificationEnd} />
      )}
      <StartLearningDayModal
        onStartLearningDay={onStartLearningDay}
        isOpen={isStartLearningDayModalOpen && !learningDayStarted}
        onClose={() => setIsStartLearningDayModalOpen(false)}
        isLoading={isLoading}
      >
        {learningDayFailed && (
        <ErrorNotification text="Failed" />
        )}
      </StartLearningDayModal>
      <Button
        size="small"
        priority="secondary"
        prefixIcon={<Add />}
        skin="standard"
        onClick={() => setIsStartLearningDayModalOpen(true)}
      >
        Start Learning Day
      </Button>
    </div>
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
