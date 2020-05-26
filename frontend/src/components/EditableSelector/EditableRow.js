/* eslint-disable no-unused-expressions */
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import X from 'wix-ui-icons-common/X';
import Check from 'wix-ui-icons-common/Check';

import {
  Input, Tooltip, IconButton, Dropdown,
} from 'wix-style-react';
import styles from './EditableSelector.scss';
import SelectTopicForm from '../topicsPage/SelectTopicForm';

const EditableRow = ({ newOption, onApprove, onCancel }) => {
  const [parentTopic, setParentTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSearchAndDropDownMissmatched, setIsSearchAndDropDownMissmatched] = useState(false);
  const [parentTopicSubject, setParentTopicSubject] = useState('');

  const [newestOption, setNewestOption] = useState(newOption || '');

  const onApproveWrap = () => {
    onApprove && onApprove(newestOption);
  };

  const onCancelWrap = () => {
    onCancel && onCancel();
  };

  return (
    <div className={styles.editableRowContainer}>
      <div className={styles.editableRowInputWrap}>
        <SelectTopicForm />
      </div>

      <div className={styles.editableRowButtons}>
        <Tooltip content="Cancel" timeout={0}>
          <IconButton
            onClick={onCancelWrap}
            size="medium"
            priority="secondary"
            dataHook="edit-row-cancel-button"
          >
            <X />
          </IconButton>
        </Tooltip>

        <Tooltip content="Confirm" timeout={0}>
          <IconButton
            onClick={onApproveWrap}
            size="medium"
            disabled={newestOption.length === 0}
            dataHook="edit-row-approve-button"
          >
            <Check />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default EditableRow;
