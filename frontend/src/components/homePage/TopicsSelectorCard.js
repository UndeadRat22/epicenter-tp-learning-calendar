import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Selector, Checkbox, Box, Layout, Cell, Avatar, Text, Loader,
} from 'wix-style-react';
import { useSelector } from 'react-redux';
import EditableSelector from '../EditableSelector/EditableSelector';
import s from './TopicsSelectorCard.scss';
import { PLANNED, LEARNED, NOTPLANNED } from '../../constants/ProgressStatus';

const mockTopics = [
  {
    id: '8fc627b9-b78e-4e34-acc8-08d7fd5087e5',
    subject: '.Net',
    progressStatus: PLANNED,
  },
  {
    id: '466e1c84-ca0b-412e-acc9-08d7fd5087e5',
    subject: 'ASP.NET',
    progressStatus: LEARNED,
  },
  {
    id: '1e9cdf75-cb8e-4a0b-2482-08d7fe97417b',
    subject: 'Java',
    progressStatus: PLANNED,
  },
];

const TopicsSelectorCard = ({
  employee, topics, isSelf, isLoading, maxTopics,
}) => {
  // TODO: topics instead of mockTopics
  const [selectedTopics, setSelectedTopics] = useState(mockTopics.map(topic => ({ ...topic, isChecked: topic.progressStatus === LEARNED })));

  // const [options, setOptions] = useState([{ title: 'Pumpkin Seeds' }, { title: 'Sunflower Seeds' }]);

  // const allTopics = useSelector(state => state.allTopics);

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
    </Card>
  );
};

export default TopicsSelectorCard;
