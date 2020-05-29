import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import {
  Avatar, Badge, Box, Cell, Divider, Layout, Tag, Text, Tooltip,
} from 'wix-style-react';
import { useDispatch } from 'react-redux';
import {
  assignGoal, assignPersonalGoal, removeGoal, removePersonalGoal,
} from '../../state/actions/assignGoals';
import s from './styles.scss';
import { TOPIC } from '../../constants/DraggableTypes';
import EditLimitModal from '../modals/EditLimitModal';

const renderLimit = (limit, onClick) => {
  const remainingDays = limit.learningDaysPerQuarter - limit.createdLearningDaysThisQuarter;
  const badgeText = `${remainingDays}/${limit.learningDaysPerQuarter}`;
  const tooltipText = 'Remaining days this quarter';

  let badgeSkin = 'general';
  if (remainingDays === 1)
    badgeSkin = 'warning';
  else if (remainingDays <= 0)
    badgeSkin = 'danger';

  return (
    <Tooltip content={tooltipText} textAlign="center">
      <div>
        <Badge onClick={onClick} skin={badgeSkin}>
          {badgeText}
        </Badge>
      </div>
    </Tooltip>
  );
};

const EmployeeCard = ({ employee }) => {
  const dispatch = useDispatch();
  const [isOpenedEditLimitModal, setIsOpenedEditLimitModal] = useState(false);

  const { isSelf } = employee;
  const handleAssignGoal = topic => {
    if (isSelf)
      dispatch(assignPersonalGoal({ topic }));
    else
      dispatch(assignGoal({ employeeId: employee.id, topic }));
  };
  const handleRemoveGoal = topicId => {
    if (isSelf)
      dispatch(removePersonalGoal({ topicId }));
    else
      dispatch(removeGoal({ employeeId: employee.id, topicId }));
  };

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

  let employeeClass = s.employee;
  if (isActive)
    employeeClass = s.activeEmployee;
  else if (!canDrop && isOver)
    employeeClass = s.notDroppableEmployee;

  if (isSelf)
    employeeClass = `${employeeClass} ${s.selfEmployee}`;

  const hasGoals = Array.isArray(employee.goalTopics) && employee.goalTopics.length > 0;

  const onLimitClicked = () => {
    if (!isSelf)
      setIsOpenedEditLimitModal(true);
  };

  return (
    <div className={employeeClass} ref={drop}>
      <Layout gap={8}>
        <Cell span={12}>
          <Box align="space-between" verticalAlign="middle">
            <Box verticalAlign="middle">
              <Box marginRight="20px">
                <Avatar
                  name={employee.name}
                  color={isSelf ? 'A1' : 'A2'}
                  size="size36"
                />
              </Box>
              <Box>
                <Text weight={isSelf ? 'bold' : 'normal'}>
                  {employee.name}
                </Text>
              </Box>
            </Box>
            {renderLimit(employee.limit, onLimitClicked)}
          </Box>
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
                <Tag
                  id={goalTopic.topicId}
                  key={goalTopic.topicId}
                  className={s.topicTag}
                  theme="dark"
                  removable={!!goalTopic.isRemovable}
                  onRemove={() => handleRemoveGoal(goalTopic.topicId)}
                >
                  {goalTopic.topic}
                </Tag>
              ))}
            </div>
          </Cell>
        )}
        {isOpenedEditLimitModal
        && (
          <EditLimitModal
            isModalOpened={isOpenedEditLimitModal}
            onCloseModal={() => setIsOpenedEditLimitModal(false)}
            employee={employee}
          />
        )}
      </Layout>
    </div>
  );
};

export default EmployeeCard;
