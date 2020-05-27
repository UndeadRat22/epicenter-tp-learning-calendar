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
  onApprove, onCancel, topic, notIncludedTopicIds = [],
}) => {
  const [topicId, setTopicId] = useState(topic ? topic.id : null);
  const [newTopicSubject, setNewTopicSubject] = useState(topic ? topic.subject : '');

  const [isSearchAndDropDownMissmatched, setIsSearchAndDropDownMissmatched] = useState(false);

  const onApproveWrap = () => {
    onApprove && onApprove(topicId, newTopicSubject);
  };

  const onCancelWrap = () => {
    onCancel && onCancel();
  };

  const isApproveDisabled = isSearchAndDropDownMissmatched || !topicId;

  return (
    <div className={styles.editableRowContainer}>
      <div className={styles.editableRowInputWrap}>
        <SelectTopicForm
          notIncludedTopicIds={notIncludedTopicIds}
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

        <Tooltip content={isApproveDisabled ? 'Please choose topic' : 'Confirm'} timeout={0}>
          <div>
            <IconButton
              onClick={onApproveWrap}
              size="medium"
              disabled={isApproveDisabled}
              dataHook="edit-row-approve-button"
            >
              <Check />
            </IconButton>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default EditableRow;
