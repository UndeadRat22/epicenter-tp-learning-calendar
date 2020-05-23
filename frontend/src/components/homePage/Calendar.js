import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.global.scss';
import {
  CounterBadge, TextButton, Badge, IconButton,
} from 'wix-style-react';
import ChevronDownSmall from 'wix-ui-icons-common/ChevronDownSmall';
import Minus from 'wix-ui-icons-common/Minus';
import CalendarToolbar from './CalendarToolbar';
import CreateTopicModal from '../modals/CreateTopicModal';
import DeleteLearningDayModal from '../modals/DeleteLearningDayModal';

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

  const CustomDateHeader = ({
    label, date, onDrillDown, drillDownView, isOffRange,
  }) => {
    return (
      <span className="cursor">
        {date.getDate() === 7
      && (
      <IconButton
        as="button"
        onClick={e => {
          setIsCancelModalOpen(true);
          console.log('icon clicked');
        }}
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
      <DeleteLearningDayModal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} />
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
        defaultView={defaultView}
        onView={newView => {
          if (newView === 'day')
            onLearningDayClick();
        }}
        showMultiDayTimes={false}
        components={{
          month: {
            dateHeader: CustomDateHeader,
          },
          toolbar: CalendarToolbar,
        }}
        onSelectSlot={x => console.log(`onSelectSlot: ${isCancelModalOpen}`)}
      />
    </>
  );
};

export default Calendar;
