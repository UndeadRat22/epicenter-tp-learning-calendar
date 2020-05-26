import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Selector, Checkbox, Box, Layout, Cell, Avatar, Text, Loader, RichTextInputArea, Heading,
} from 'wix-style-react';
import { useSelector } from 'react-redux';
import EditableSelector from '../EditableSelector/EditableSelector';
import s from './TopicsSelectorCard.scss';
import { IN_PROGRESS, DONE } from '../../constants/LearningDayTopicProgressStatus';

const mockTopics = [
  {
    id: '8fc627b9-b78e-4e34-acc8-08d7fd5087e5',
    subject: '.Net',
    progressStatus: IN_PROGRESS,
  },
  {
    id: '466e1c84-ca0b-412e-acc9-08d7fd5087e5',
    subject: 'ASP.NET',
    progressStatus: DONE,
  },
  {
    id: '1e9cdf75-cb8e-4a0b-2482-08d7fe97417b',
    subject: 'Java',
    progressStatus: IN_PROGRESS,
  },
];

const TopicsSelectorCard = ({
  employee, topics, isSelf, isLoading, maxTopics, initialComments,
}) => {
  // TODO: topics instead of mockTopics
  const [selectedTopics, setSelectedTopics] = useState(mockTopics.map(topic => ({ ...topic, isChecked: topic.progressStatus === DONE })));
  const [comments, setComments] = useState(initialComments || '');

  const onCommentsChange = newComments => {
    setComments(newComments);
  };

  const onTopicChange = ({ newTopicId, newTopicSubject, index }) => {
    // progressStatus is PLANNED, because you can only add topics today and in the future
    setSelectedTopics(selectedTopics.map((topic, i) => (i === index ? ({ id: newTopicId, subject: newTopicSubject, isChecked: true }) : topic)));
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

  return (
    <Card className={s.card}>
      <Card.Content size="medium">
        {isLoading ? <div style={{ textAlign: 'center' }}><Loader size="medium" /></div>
          : (
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
            initialValue=""
            onChange={onCommentsChange}
            placeholder="Default text goes here"
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default TopicsSelectorCard;
