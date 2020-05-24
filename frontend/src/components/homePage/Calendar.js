import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.global.scss';
import {
  CounterBadge, TextButton, Badge, IconButton, SectionHelper, FloatingNotification,
} from 'wix-style-react';
import Minus from 'wix-ui-icons-common/Minus';
import { useSelector, useDispatch } from 'react-redux';
import CalendarToolbar from './CalendarToolbar';
import CancelLearningDayModal from '../modals/CancelLearningDayModal';
import LearningDay from './LearningDay';
import { isSelfLearningDay, isTeamLearningDay, getSelfLearningDayFromDate } from '../../utils/learningDay';
import { CANCEL_LEARNING_DAY_SUCCEEDED, CANCEL_LEARNING_DAY_FAILED, LOADING_CANCEL_LEARNING_DAY } from '../../constants/LearningDaysStatus';
import { cancelLearningDay, suspendCancelLearningDay } from '../../state/actions';
import ModalWrapper from '../modals/ModalWrapper';
import { useToast } from '../../ToastContainer';

const localizer = momentLocalizer(moment);

const VIEWS = {
  month: true,
  day: LearningDay,
};

const getDayProps = (date, selfLearningDays, teamLearningDays, userId) => {
  const selfLearningDay = isSelfLearningDay(date, selfLearningDays);
  const teamLearningDay = isTeamLearningDay(date, teamLearningDays, userId);

  if (selfLearningDay && teamLearningDay)
    return 'cursor self-and-team-learning-day';

  const className = `cursor ${selfLearningDay ? 'self-learning-day' : ''} ${teamLearningDay ? 'team-learning-day' : ''}`;
  return { className };
};

const Calendar = ({
  onLearningDayClick, isMonthlyView, selfLearningDays, teamLearningDays,
}) => {
  const status = useSelector(state => state.learningDays.cancelStatus);
  const dispatch = useDispatch();

  const learningDayCancelled = status === CANCEL_LEARNING_DAY_SUCCEEDED;
  const cancelLearningDayFailed = status === CANCEL_LEARNING_DAY_FAILED;
  const isLoading = status === LOADING_CANCEL_LEARNING_DAY;

  const onSuccess = () => {
    setIsCancelModalOpen(false);
    dispatch(suspendCancelLearningDay());
  };

  const onError = () => {
    dispatch(suspendCancelLearningDay());
  };

  useToast({
    successText: 'Successfull Cancel',
    errorText: 'Failure cancelling',
    shouldShowSuccessWhen: learningDayCancelled,
    shouldShowErrorWhen: cancelLearningDayFailed,
    onSuccess,
    onError,
  });

  const onCancelLearningDay = () => {
    dispatch(cancelLearningDay(getSelfLearningDayFromDate(cancellableDate, selfLearningDays).id));
  };

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cancellableDate, setCancellableDate] = useState(null);

  const user = useSelector(state => state.auth.user);

  const onMinusIconClick = date => {
    setCancellableDate(date);
    setIsCancelModalOpen(true);
  };

  const switchToLearningDayView = ({ start }) => {
    if (isCancelModalOpen)
      return;

    setCurrentDate(start);
    onLearningDayClick();
  };

  const CustomDateHeader = ({
    label, date, onDrillDown, drillDownView, isOffRange,
  }) => {
    return (
      <span className="cursor">
        {isSelfLearningDay(date, selfLearningDays)
      && (
      <IconButton
        as="button"
        onClick={() => onMinusIconClick(date)}
        size="tiny"
        priority="secondary"
        skin="premium"
        className="minus-icon icon-position"
      >
        <Minus className="minus-icon" />
      </IconButton>
      )}
        <TextButton skin="dark" as="button" onClick={onDrillDown}>{label}</TextButton>
      </span>
    );
  };
  return (
    <>
      <ModalWrapper
        onOk={onCancelLearningDay}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        isLoading={isLoading}
        title="Cancel Learning Day"
        footerText="Once cancelled, cannot be undone"
        text="Do you really want to cancel learning day together with all topics?"
        alert
      />
      <BigCalendar
        events={[]}
        dayPropGetter={date => getDayProps(date, selfLearningDays, teamLearningDays, user.id)}
        selectable
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={isMonthlyView ? Views.MONTH : Views.DAY}
        views={VIEWS}
        date={currentDate}
        defaultView={Views.MONTH}
        onView={newView => {
          if (newView === Views.DAY)
            onLearningDayClick();
        }}
        showMultiDayTimes={false}
        defaultDate={new Date()}
        onNavigate={newDate => setCurrentDate(newDate)}
        components={{
          month: {
            dateHeader: CustomDateHeader,
          },
          toolbar: CalendarToolbar,
        }}
        onSelectSlot={switchToLearningDayView}
      />
    </>
  );
};

export default Calendar;
