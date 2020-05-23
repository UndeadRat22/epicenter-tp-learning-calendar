import React, { useState } from 'react';
import * as dates from 'date-arithmetic';
import { Button } from 'wix-style-react';
import Add from 'wix-ui-icons-common/Add';
import StartLearningDayModal from '../modals/StartLearningDayModal';

const LearningDay = ({
  date, accessors, allDayAccessors, dayPropGetter, drillDownView, getNow, onView, onSelectSlot, onNavigate, events,
}) => {
  const [isStartLearningDayModalOpen, setIsStartLearningDayModalOpen] = useState(false);

  return (
    <div style={{ margin: '0 auto' }}>
      <StartLearningDayModal isOpen={isStartLearningDayModalOpen} onClose={() => setIsStartLearningDayModalOpen(false)} />
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
  return date.toISOString().slice(0, 10);
};

export default LearningDay;
