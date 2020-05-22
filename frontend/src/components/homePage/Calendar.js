import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// has to be .global.scss to import built-in big-calendar styles
import './Calendar.global.scss';

const localizer = momentLocalizer(moment);

const defaultView = 'month';

const Calendar = ({ onLearningDayClick, isMonthlyView }) => {
  return (
    <BigCalendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 }}
      view={isMonthlyView ? 'month' : 'day'}
      defaultView={defaultView}
      onView={newView => {
        if (newView === 'day')
          onLearningDayClick();
      }}
      showMultiDayTimes={false}
    />
  );
};

export default Calendar;
