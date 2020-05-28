import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Text, Tooltip } from 'wix-style-react';
import { useDispatch } from 'react-redux';
import { assignTeamGoal } from '../../state/actions/assignGoals';
import s from './styles.scss';
import { TOPIC } from '../../constants/DraggableTypes';

const TeamCard = ({ employees }) => {
  const dispatch = useDispatch();

  const handleAssignGoal = topic => {
    const assignees = employees.filter(employee => employee.goalTopics.every(goalTopic => goalTopic.topicId !== topic.topicId));

    const personalGoals = [];
    const goals = [];

    assignees.forEach(assignee => {
      if (assignee.isSelf)
        personalGoals.push({ topic });
      else
        goals.push({ employeeId: assignee.id, topic });
    });
    dispatch(assignTeamGoal({ personalGoals, goals }));
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: TOPIC,
    drop: item => handleAssignGoal({ topicId: item.topic.id, topic: item.topic.subject }),
    canDrop: item => employees.some(employee => employee.goalTopics.every(topic => topic.topicId !== item.topic.id)),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  let teamClass = s.team;
  if (isActive)
    teamClass = s.activeTeam;
  else if (!canDrop && isOver)
    teamClass = s.notDroppableTeam;

  return (
    <div className={teamClass} ref={drop}>
      <Tooltip content="Drop a topic here to assign it to your whole team" textAlign="center">
        <div>
          <Box align="center" verticalAlign="middle">
            <Text weight="bold">My Team</Text>
          </Box>
        </div>
      </Tooltip>
    </div>
  );
};

export default TeamCard;
