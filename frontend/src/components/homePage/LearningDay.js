import React, { useState } from 'react';
import * as dates from 'date-arithmetic';
import { Button } from 'wix-style-react';
import Add from 'wix-ui-icons-common/Add';
import { useDispatch, useSelector } from 'react-redux';
import { startLearningDay, suspendStartLearningDay, getLearningDays } from '../../state/actions/learningDays';
import { getOnlyLocalDate } from '../../utils/dateParser';
import { START_LEARNING_DAY_SUCCEEDED, START_LEARNING_DAY_FAILED, LOADING_START_LEARNING_DAY } from '../../constants/LearningDaysStatus';
import ModalWrapper from '../modals/ModalWrapper';
import { useToast } from '../../ToastContainer';
import { getLimits } from '../../state/actions';

const LearningDay = ({
  date, accessors, allDayAccessors, dayPropGetter, drillDownView, getNow, onView, onSelectSlot, onNavigate, events,
}) => {
  const status = useSelector(state => state.learningDays.startStatus);
  const dispatch = useDispatch();

  const isLoading = status === LOADING_START_LEARNING_DAY;

  const [isStartLearningDayModalOpen, setIsStartLearningDayModalOpen] = useState(false);

  const onSuccess = () => {
    setIsStartLearningDayModalOpen(false);
    dispatch(suspendStartLearningDay());
    dispatch(getLearningDays());
    dispatch(getLimits());
  };

  const onError = () => {
    dispatch(suspendStartLearningDay());
  };

  useToast({
    successText: 'Created Learning Day',
    errorText: 'Failed to Create Learning Day',
    shouldShowSuccessWhen: status === START_LEARNING_DAY_SUCCEEDED,
    shouldShowErrorWhen: status === START_LEARNING_DAY_FAILED,
    onSuccess,
    onError,
  });

  const onStartLearningDay = () => {
    dispatch(startLearningDay(date));
  };

  return (
    <div style={{ margin: '0 auto' }}>
      <ModalWrapper
        onOk={onStartLearningDay}
        isOpen={isStartLearningDayModalOpen}
        onClose={() => setIsStartLearningDayModalOpen(false)}
        isLoading={isLoading}
        title="Add Learning Day"
        footerText="You can cancel it at any point in the future"
        text="Are you sure you want to add a learning day?"
      />
      <Button
        size="small"
        priority="secondary"
        prefixIcon={<Add />}
        skin="standard"
        onClick={() => setIsStartLearningDayModalOpen(true)}
      >
        Add Learning Day
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
