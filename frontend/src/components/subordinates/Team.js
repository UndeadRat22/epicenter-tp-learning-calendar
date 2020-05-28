import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Avatar, Badge, Box, Text, Tooltip,
} from 'wix-style-react';
import { EMPLOYEE } from '../../constants/DraggableTypes';
import s from './styles.scss';

const Team = ({ teamManager }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: EMPLOYEE,
    drop: item => console.log(`${item.fullName} dropped!`),
    canDrop: item => teamManager.id !== item.employee.id && teamManager.id !== item.employee.managerId,
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

  const { isSelf } = teamManager;

  if (isSelf)
    teamClass = `${teamClass} ${s.selfTeam}`;

  const tooltipContent = `${teamManager.managedEmployeesCount} employes in this team`;

  return (
    <div className={teamClass} ref={drop}>
      <Box align="space-between" verticalAlign="middle">
        <Box verticalAlign="middle">
          <Box marginRight="20px">
            <Avatar
              name={teamManager.fullName}
              color={isSelf ? 'A1' : 'A2'}
              size="size36"
            />
          </Box>
          <Box>
            <Text weight={isSelf ? 'bold' : 'normal'}>
              {teamManager.fullName}
            </Text>
          </Box>
        </Box>
        <Tooltip content={tooltipContent}>
          <div>
            <Badge type={teamManager.managedEmployeesCount > 0 ? 'solid' : 'outlined'}>
              {teamManager.managedEmployeesCount}
            </Badge>
          </div>
        </Tooltip>
      </Box>
    </div>
  );
};

export default Team;
