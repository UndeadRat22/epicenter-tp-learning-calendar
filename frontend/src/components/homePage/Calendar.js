import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.global.scss';
import {
  TextButton, Badge, IconButton, Tooltip,
} from 'wix-style-react';
import Minus from 'wix-ui-icons-common/Minus';
import { useSelector, useDispatch } from 'react-redux';
import CalendarToolbar from './CalendarToolbar';
import LearningDay from './LearningDay';
import { isSelfLearningDay, isTeamLearningDay, getSelfLearningDayFromDate } from '../../utils/learningDay';
import { CANCEL_LEARNING_DAY_SUCCEEDED, CANCEL_LEARNING_DAY_FAILED, LOADING_CANCEL_LEARNING_DAY } from '../../constants/LearningDaysStatus';
import {
  cancelLearningDay, suspendCancelLearningDay, getLimits, getPersonalGoals, getLearningDays,
} from '../../state/actions';
import ModalWrapper from '../modals/ModalWrapper';
import { isTodayOrInFuture } from '../../utils/dateParser';
import FeatureToggles from '../../utils/FeatureToggles';

const localizer = momentLocalizer(moment);

const VIEWS = {
  month: true,
  day: LearningDay,
};

const getDayProps = (date, selfLearningDays, teamLearningDays) => {
  const selfLearningDay = isSelfLearningDay(date, selfLearningDays);
  const teamLearningDay = isTeamLearningDay(date, teamLearningDays);

  if (selfLearningDay && teamLearningDay)
    return { className: 'cursor self-and-team-learning-day' };

  const className = `cursor ${selfLearningDay ? 'self-learning-day' : ''} ${teamLearningDay ? 'team-learning-day' : ''}`;
  return { className };
};

const Calendar = ({
  onLearningDayClick, isMonthlyView, selfLearningDays, teamLearningDays,
}) => {
  const status = useSelector(state => state.learningDays.cancelStatus);
  const dispatch = useDispatch();

  const isLoading = status === LOADING_CANCEL_LEARNING_DAY;

  const onCancelLearningDay = () => {
    dispatch(cancelLearningDay(getSelfLearningDayFromDate(cancellableDate, selfLearningDays).id, cancellableDate));
  };

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cancellableDate, setCancellableDate] = useState(null);

  if (status === CANCEL_LEARNING_DAY_SUCCEEDED) {
    dispatch(suspendCancelLearningDay());
    setIsCancelModalOpen(false);
  }

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
    const shouldDisplayCancelIcon = isTodayOrInFuture(date) || FeatureToggles.isOn('cancel-past-learning-day');

    return (
      <span className="cursor">
        {isSelfLearningDay(date, selfLearningDays)
      && (
      <>
        { shouldDisplayCancelIcon
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
      ) }
        <span className="team-badge">
          <Badge
            // don't remove empty onClick, cursor will not be shown
            onClick={() => {}}
            size="small"
          >
            PERSONAL
          </Badge>
        </span>
      </>
      )}
        {isTeamLearningDay(date, teamLearningDays) && (
        <span className="team-badge">
          <Tooltip content="Someone from your team added this as a learning day!">
            <div>
              <Badge
            // don't remove empty onClick, cursor will not be shown
                onClick={() => {}}
                size="small"
              >
                TEAM
              </Badge>
            </div>
          </Tooltip>
        </span>
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
        dayPropGetter={date => getDayProps(date, selfLearningDays, teamLearningDays)}
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
