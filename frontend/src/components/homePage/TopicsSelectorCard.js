import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Selector, Checkbox, Box, Layout, Cell, Avatar, Text, Loader,
} from 'wix-style-react';
import EditableSelector from '../EditableSelector/EditableSelector';
import s from './TopicsSelectorCard.scss';
import { PLANNED } from '../../constants/ProgressStatus';

const mockTopics = [
  {
    id: '1',
    subject: 'mock topic 1',
    progressStatus: PLANNED,
  },
  {
    id: '2',
    subject: 'mock topic 2',
    progressStatus: PLANNED,
  },
  {
    id: '3',
    subject: 'mock topic 3',
    progressStatus: PLANNED,
  },
];

const TopicsSelectorCard = ({
  employee, topics, isSelf, isLoading,
}) => {
  const [selectedTopics, setSelectedTopics] = useState(mockTopics);

  // TODO: uncomment to connect real topics
  // const [selectedTopics, setSelectedTopics] = useState(topics);

  // const [options, setOptions] = useState([{ title: 'Pumpkin Seeds' }, { title: 'Sunflower Seeds' }]);

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
          toggleType="checkbox"
          title="Topics"
          topics={selectedTopics}
          isSelf={isSelf}
        />
        )}
      </Card.Content>
    </Card>
  );
};

export default TopicsSelectorCard;
