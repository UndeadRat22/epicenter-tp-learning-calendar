import React, { useState, useRef } from 'react';
import {
  Container, Row, Col, Card, Selector, Checkbox, Box, Layout, Cell, Avatar, Text, Loader, RichTextInputArea, Heading, Button,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import EditableSelector from '../EditableSelector/EditableSelector';
import s from './TopicsSelectorCard.scss';
import { IN_PROGRESS, DONE } from '../../constants/LearningDayTopicProgressStatus';
import ResetSaveButtonsBox from '../ResetSaveButtonsBox';
import { UPDATE_LEARNING_DAY_SUCCEEDED, UPDATE_LEARNING_DAY_FAILED } from '../../constants/LearningDaysStatus';
import { suspendUpdateLearningDay } from '../../state/actions';

const getInitialSelectedTopics = topics => topics.map(topic => ({ id: topic.id, subject: topic.subject, isChecked: topic.progressStatus === DONE }));

const removeWhiteSpaces = str => str.replace(/\s/g, '');

const TopicsSelectorCard = ({
  employee, topics, isSelf, isLoading, maxTopics, initialComments, onSave, commentsDisabled, editTopicsDisabled, checkBoxesDisabled, addTopicDisabled,
}) => {
  const [initialTopicsUpdated, setInitialTopicsUpdated] = useState(getInitialSelectedTopics(topics));
  const [initialCommentsUpdated, setInitialCommentsUpdated] = useState(initialComments);

  const commentsInputRef = useRef(null);

  const [updateLoading, setUpdateLoading] = useState(true);
  const [updateSucceeded, setUpdateSucceeded] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);

  const [selectedTopics, setSelectedTopics] = useState(getInitialSelectedTopics(topics));
  const [comments, setComments] = useState(initialComments || '');

  const { updateStatus } = useSelector(state => state.learningDays);

  const dispatch = useDispatch();

  const anyChangesMade = !_.isEqual(selectedTopics, initialTopicsUpdated)
    || removeWhiteSpaces(comments) !== removeWhiteSpaces(initialCommentsUpdated);

  const onCommentsChange = newComments => {
    setComments(newComments);
  };

  const onTopicChange = ({ newTopicId, newTopicSubject, index }) => {
    setSelectedTopics(selectedTopics.map((topic, i) => (i === index ? ({ id: newTopicId, subject: newTopicSubject, isChecked: false }) : topic)));
  };

  const onTopicDelete = ({ index }) => {
    setSelectedTopics(selectedTopics.filter((topic, i) => i !== index));
  };

  const onTopicAdd = ({ newTopicId, newTopicSubject }) => {
    setSelectedTopics([...selectedTopics, { id: newTopicId, subject: newTopicSubject, isChecked: false }]);
  };

  const onTopicCheck = index => {
    setSelectedTopics(selectedTopics.map((topic, i) => (i === index ? { ...topic, isChecked: !topic.isChecked } : topic)));
  };

  const onSaveClick = () => {
    setUpdateLoading(true);
    onSave({ comments, newTopics: selectedTopics.map(topic => ({ subject: topic.subject, topicId: topic.id, progressStatus: topic.isChecked ? DONE : IN_PROGRESS })) });
  };

  const onResetClick = () => {
    setSelectedTopics(initialTopicsUpdated);
    commentsInputRef.current.setValue(initialCommentsUpdated);
    setComments(initialCommentsUpdated);
  };

  if (updateStatus === UPDATE_LEARNING_DAY_SUCCEEDED) {
    setInitialCommentsUpdated(comments);
    setInitialTopicsUpdated(selectedTopics);
    setUpdateLoading(false);
    setUpdateSucceeded(true);
    setUpdateFailed(false);
    dispatch(suspendUpdateLearningDay());
  }

  if (updateStatus === UPDATE_LEARNING_DAY_FAILED) {
    setUpdateLoading(false);
    setUpdateFailed(true);
    setUpdateSucceeded(false);
    dispatch(suspendUpdateLearningDay());
  }

  return (
    <Card className={s.card}>
      <Card.Content size="medium">
        <Box align="space-between">
          <Box>
            <span className={s.avatar}>
              <Avatar
                name={employee.name}
                color={isSelf ? 'A1' : 'A2'}
                size="size36"
              />
            </span>
            <Text>
              {employee.name}
            </Text>
          </Box>
          <ResetSaveButtonsBox
            onSave={onSaveClick}
            onReset={onResetClick}
            anyChangesMade={anyChangesMade}
            savingSucceeded={!updateLoading && updateSucceeded}
            savingFailed={!updateLoading && updateFailed}
          />
        </Box>
      </Card.Content>
      <Card.Divider />
      <Card.Content>
        {isLoading ? <div style={{ textAlign: 'center' }}><Loader size="medium" /></div> : (
          <EditableSelector
            addTopicDisabled={addTopicDisabled}
            checkBoxesDisabled={checkBoxesDisabled}
            editTopicsDisabled={editTopicsDisabled}
            maxTopics={maxTopics}
            toggleType="checkbox"
            title="Topics"
            topics={selectedTopics}
            isSelf={isSelf}
            onOptionEdit={onTopicChange}
            onOptionDelete={onTopicDelete}
            onOptionAdded={onTopicAdd}
            onOptionToggle={onTopicCheck}
          />
        )}
      </Card.Content>
      <Card.Divider />
      <Card.Content>
        <Text weight="normal">Comments</Text>
        <div style={{ marginTop: 16 }}>
          <RichTextInputArea
            disabled={commentsDisabled}
            initialValue={initialComments || ''}
            onChange={onCommentsChange}
            placeholder="Default text goes here"
            ref={commentsInputRef}
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default TopicsSelectorCard;
