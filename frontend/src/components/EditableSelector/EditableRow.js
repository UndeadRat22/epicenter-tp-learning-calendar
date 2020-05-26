/* eslint-disable no-unused-expressions */
import React, { Component, useState } from 'react';
import X from 'wix-ui-icons-common/X';
import Check from 'wix-ui-icons-common/Check';

import {
  Input, Tooltip, IconButton, Dropdown,
} from 'wix-style-react';
import styles from './EditableSelector.scss';
import SelectTopicForm from '../topicsPage/SelectTopicForm';

const EditableRow = ({
  onApprove, onCancel, topic,
}) => {
  const [topicId, setTopicId] = useState(topic.id || null);
  const [newTopicSubject, setNewTopicSubject] = useState(topic.subject || '');

  const [isSearchAndDropDownMissmatched, setIsSearchAndDropDownMissmatched] = useState(false);

  const onApproveWrap = () => {
    onApprove && onApprove(topicId);
  };

  const onCancelWrap = () => {
    onCancel && onCancel();
  };

  return (
    <div className={styles.editableRowContainer}>
      <div className={styles.editableRowInputWrap}>
        <SelectTopicForm
          onSelectTopic={selectedTopicId => setTopicId(selectedTopicId)}
          parentTopic={newTopicSubject}
          onParentTopicSubjectChange={topicSubject => setNewTopicSubject(topicSubject)}
          onSearchAndDropDownMissmatch={x => setIsSearchAndDropDownMissmatched(x)}
        />
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
            disabled={isSearchAndDropDownMissmatched || !topicId}
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
