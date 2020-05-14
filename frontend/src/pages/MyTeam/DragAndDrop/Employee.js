import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Avatar, Cell, Divider, Layout, Tag, Text,
} from 'wix-style-react';
import { useDispatch } from 'react-redux';
import { assignGoal } from '../../../state/actions/goals';
import s from './styles/Employee.scss';
import DraggableTypes from './DraggableTypes';

const Employee = ({ employee }) => {
  const dispatch = useDispatch();
  const handleAssignGoal = topic => dispatch(assignGoal({ employeeId: employee.id, topic }));

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DraggableTypes.TOPIC,
    drop: item => {
      if (!employee.goalTopics.some(goalTopic => goalTopic.topicId === item.topic.id))
        handleAssignGoal({ topicId: item.topic.id, topic: item.topic.subject });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  const hasGoals = Array.isArray(employee.goalTopics) && employee.goalTopics.length > 0;

  return (
    <div className={isActive ? s.selectedEmployee : s.employee} ref={drop}>
      <Layout gap={8}>
        <Cell span={12}>
          <Layout>
            <Cell span={2}>
              <Avatar
                name={employee.name}
                color="A1"
                size="size36"
              />
            </Cell>
            <Cell span={10}>
              <Text>
                {employee.name}
              </Text>
            </Cell>
          </Layout>
        </Cell>
        {hasGoals && (
          <Cell span={12}>
            <Divider />
          </Cell>
        )}
        {hasGoals && (
          <Cell span={12}>
            <div className={s.tagContainer}>
              {employee.goalTopics.map(goalTopic => (
                <Tag id={goalTopic.topicId} key={goalTopic.topicId} removable={false}>
                  {goalTopic.topic}
                </Tag>
              ))}
            </div>
          </Cell>
        )}
      </Layout>
    </div>
  );
};

export default Employee;
