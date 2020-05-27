import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Selector, Checkbox, Box, Layout, Cell, Avatar, Text, Loader, RichTextInputArea, Heading, Button,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import EditableSelector from '../EditableSelector/EditableSelector';
import s from './TopicsSelectorCard.scss';
import { IN_PROGRESS, DONE } from '../../constants/LearningDayTopicProgressStatus';
import { updateLearningDay } from '../../state/actions';
import { getSelfLearningDayFromDate } from '../../utils/learningDay';

const getInitialSelectedTopics = topics => topics.map(topic => ({ ...topic, isChecked: topic.progressStatus === DONE }));

// TODO: learningDay should be enough for most of these props
const TopicsSelectorCard = ({
  employee, topics, isSelf, isLoading, maxTopics, initialComments, onSave,
}) => {
  // TODO: topics instead of mockTopics
  // const [selectedTopics, setSelectedTopics] = useState(mockTopics.map(topic => ({ ...topic, isChecked: topic.progressStatus === DONE })));
  const [selectedTopics, setSelectedTopics] = useState(getInitialSelectedTopics(topics));
  const [comments, setComments] = useState(initialComments || '');

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
    onSave({ comments, newTopics: selectedTopics.map(topic => ({ topicId: topic.id, progressStatus: topic.isChecked ? DONE : IN_PROGRESS })) });
  };

  const onResetClick = () => {
    setSelectedTopics(getInitialSelectedTopics(topics));
  };

  return (
    <Card className={s.card}>
      <Card.Content size="medium">
        {isLoading ? <div style={{ textAlign: 'center' }}><Loader size="medium" /></div>
          : (
            <Box align="space-between">
              <Box>
                <span className={s.avatar}>
                  <Avatar
                    name={employee.name}
                    color="A1"
                    size="size36"
                  />
                </span>
                <Text>
                  {employee.name}
                </Text>
              </Box>
              <Box>
                <Box marginRight="small">
                  <Button skin="light" onClick={onResetClick}>
                    Reset
                  </Button>
                </Box>
                <Box>
                  <Button onClick={onSaveClick}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
      </Card.Content>
      <Card.Divider />
      <Card.Content>
        {!isLoading && (
        <EditableSelector
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
            initialValue={initialComments || ''}
            onChange={onCommentsChange}
            placeholder="Default text goes here"
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default TopicsSelectorCard;
