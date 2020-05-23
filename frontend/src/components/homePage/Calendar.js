import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.global.scss';
import {
  CounterBadge, TextButton, Badge, IconButton,
} from 'wix-style-react';
import Minus from 'wix-ui-icons-common/Minus';
import { useSelector } from 'react-redux';
import CalendarToolbar from './CalendarToolbar';
import CancelLearningDayModal from '../modals/CancelLearningDayModal';
import LearningDay from './LearningDay';
import { fromISOStringToDate, areDatesEqual } from '../../utils/dateParser';

const localizer = momentLocalizer(moment);

const VIEWS = {
  month: true,
  day: LearningDay,
};

const getDayProps = (date, selfLearningDays, teamLearningDays, userId) => {
  const isSelfLearningDay = selfLearningDays.some(day => areDatesEqual(date, fromISOStringToDate(day.date)));
  const isTeamLearningDay = teamLearningDays.some(day => areDatesEqual(date, fromISOStringToDate(day.date)) && day.employeeId === userId);

  if (isSelfLearningDay && isTeamLearningDay)
    return 'cursor self-and-team-learning-day';

  const className = `cursor ${isSelfLearningDay ? 'self-learning-day' : ''} ${isTeamLearningDay ? 'team-learning-day' : ''}`;
  return { className };
};

const Calendar = ({
  onLearningDayClick, isMonthlyView, selfLearningDays, teamLearningDays,
}) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const user = useSelector(state => state.auth.user);

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
        {date.getDate() === 7
      && (
      <IconButton
        as="button"
        onClick={() => setIsCancelModalOpen(true)}
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
      <CancelLearningDayModal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} />
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
