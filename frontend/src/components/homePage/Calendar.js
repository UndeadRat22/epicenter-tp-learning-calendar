import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.global.scss';
import CalendarToolbar from './CalendarToolbar';

const localizer = momentLocalizer(moment);

const VIEWS = {
  month: true,
  day: true,
};

const defaultView = 'month';

const Calendar = ({ onLearningDayClick, isMonthlyView, learningDays }) => {
  return (
    <BigCalendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 }}
      view={isMonthlyView ? 'month' : 'day'}
      views={VIEWS}
      defaultView={defaultView}
      onView={newView => {
        if (newView === 'day')
          onLearningDayClick();
      }}
      showMultiDayTimes={false}
      components={{ toolbar: CalendarToolbar }}
    />
  );
};

export default Calendar;
