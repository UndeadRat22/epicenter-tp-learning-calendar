import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.global.scss';
import {
  CounterBadge, TextButton, Badge, IconButton,
} from 'wix-style-react';
import Minus from 'wix-ui-icons-common/Minus';
import CalendarToolbar from './CalendarToolbar';
import CancelLearningDayModal from '../modals/CancelLearningDayModal';

const localizer = momentLocalizer(moment);

const VIEWS = {
  month: true,
  day: true,
};

const defaultView = 'month';

const getDayProps = date => {
  const className = `cursor ${date.getDate() === 7 ? 'learning-day' : ''}`;
  return { className };
};

const Calendar = ({ onLearningDayClick, isMonthlyView, learningDays }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const onDaySquareClick = ({ start }) => {
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
        dayPropGetter={getDayProps}
        selectable
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={isMonthlyView ? 'month' : 'day'}
        views={VIEWS}
        date={currentDate}
        defaultView={defaultView}
        onView={newView => {
          console.log('yee...');
          if (newView === 'day')
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
        onSelectSlot={onDaySquareClick}
      />
    </>
  );
};

export default Calendar;
