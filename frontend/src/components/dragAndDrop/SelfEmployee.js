import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Avatar, Cell, Divider, Layout, Tag, Text,
} from 'wix-style-react';
import { useDispatch } from 'react-redux';
import { assignPersonalGoal, removePersonalGoal } from '../../state/actions/assignGoals';
import s from './styles.scss';
import { TOPIC } from '../../constants/DraggableTypes';

const SelfEmployee = ({ employee }) => {
  const dispatch = useDispatch();
  const handleAssignGoal = topic => dispatch(assignPersonalGoal({ employeeId: employee.id, topic }));
  const handleRemoveGoal = topicId => dispatch(removePersonalGoal({ employeeId: employee.id, topicId }));

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: TOPIC,
    drop: item => handleAssignGoal({ topicId: item.topic.id, topic: item.topic.subject }),
    canDrop: item => !employee.goalTopics.some(goalTopic => goalTopic.topicId === item.topic.id),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  const hasGoals = Array.isArray(employee.goalTopics) && employee.goalTopics.length > 0;

  return (
    <div className={isActive ? s.selectedSelfEmployee : s.selfEmployee} ref={drop}>
      <Layout gap={8}>
        <Cell span={12}>
          <Layout>
            <Cell span={1}>
              <Avatar
                name={employee.name}
                color="A1"
                size="size36"
              />
            </Cell>
            <Cell span={11}>
              <Text weight="bold">
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
                <Tag id={goalTopic.topicId} key={goalTopic.topicId} theme="dark" removable={!!goalTopic.isRemovable} onRemove={() => handleRemoveGoal(goalTopic.topicId)}>
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

export default SelfEmployee;
