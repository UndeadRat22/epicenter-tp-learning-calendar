/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Calendar.global.scss';
import {
  IconButton, Col, Container, Row, Text,
} from 'wix-style-react';
import ArrowLeft from 'wix-ui-icons-common/ArrowLeft';
import ArrowRight from 'wix-ui-icons-common/ArrowRight';
import './CalendarToolbar.global.scss';

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
};

const CalendarToolbar = ({ onNavigate, label }) => {
  return (
    <div id="textbox">
      <div className="alignleft" role="button" onClick={() => onNavigate(navigate.PREVIOUS)} tabIndex={0}>
        <ArrowLeft size={32} />
      </div>
      <Text weight="bold" className="aligncenter">{label}</Text>
      <div className="alignright" role="button" onClick={() => onNavigate(navigate.NEXT)} tabIndex={0}>
        <ArrowRight size={32} />
      </div>
      {/* <IconButton priority="secondary" style={{ marginBottom: 4 }} className="alignleft" as="button" onClick={() => alert('ha')}><ArrowLeft /></IconButton>
      <Text weight="bold" className="aligncenter">{label}</Text>
      <IconButton priority="secondary" className="alignright" style={{ marginBottom: 4 }} as="button" onClick={() => alert('ha')}><ArrowRight /></IconButton> */}
    </div>
  );
};

export default CalendarToolbar;
