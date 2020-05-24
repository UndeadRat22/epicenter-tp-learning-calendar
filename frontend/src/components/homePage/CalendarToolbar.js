import React from 'react';
import './Calendar.global.scss';

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
};

const CalendarToolbar = ({ onNavigate, label }) => {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate(navigate.PREVIOUS)}>Prev</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate(navigate.NEXT)}>Next</button>
      </span>
    </div>
  );
};

export default CalendarToolbar;
