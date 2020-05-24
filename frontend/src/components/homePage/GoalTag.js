import React from 'react';
import { Tag } from 'wix-style-react';
import s from './GoalTag.scss';

const GoalTag = ({ id, label }) => {
  return (
    <Tag className={s.tag} id={id} removable={false} size="medium" theme="dark">{label}</Tag>
  );
};

export default GoalTag;
