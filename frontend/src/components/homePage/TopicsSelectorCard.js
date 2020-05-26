import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Selector, Checkbox, Box, Layout, Cell, Avatar, Text,
} from 'wix-style-react';
import SelectTopicForm from '../topicsPage/SelectTopicForm';
import EditableSelector from '../EditableSelector/EditableSelector';
import s from './TopicsSelectorCard.scss';

const TopicsSelectorCard = ({ employee }) => {
  const [options, setOptions] = useState([{ title: 'Pumpkin Seeds' }, { title: 'Sunflower Seeds' }]);

  return (
    <Card className={s.card}>
      <Card.Content size="medium">
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
      </Card.Content>
      <Card.Divider />
      <Card.Content>
        <EditableSelector
          toggleType="checkbox"
          title="Topics"
          options={options}
        />
            &nbsp;
      </Card.Content>
    </Card>
  );
};

export default TopicsSelectorCard;
