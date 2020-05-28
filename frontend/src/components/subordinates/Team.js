import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Avatar, Badge, Box, Text, Tooltip,
} from 'wix-style-react';
import ModalWrapper from '../modals/ModalWrapper';
import { EMPLOYEE } from '../../constants/DraggableTypes';
import s from './styles.scss';
import { LOADING_UPDATE_SUBORDINATE, UPDATE_SUBORDINATE_SUCCEEDED } from '../../constants/SubordinatesStatus';
import { updateSubordinate, updateSubordinateSuspend } from '../../state/actions/subordinates';

const Team = ({ teamManager }) => {
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: EMPLOYEE,
    drop: item => onDropEmployee(item.employee),
    canDrop: item => teamManager.id !== item.employee.id && teamManager.id !== item.employee.managerId,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [droppedEmployee, setDroppedEmployee] = useState({});

  const onDropEmployee = employee => {
    setDroppedEmployee(employee);
    setIsUpdateModalOpen(true);
  };

  const onUpdateSubordinate = () => {
    dispatch(updateSubordinate({ employeeId: droppedEmployee.id, managerId: teamManager.id }));
  };

  const onCloseModal = () => {
    setDroppedEmployee({});
    setIsUpdateModalOpen(false);
  };

  const { updateStatus } = useSelector(state => state.subordinates);

  if (updateStatus === UPDATE_SUBORDINATE_SUCCEEDED) {
    dispatch(updateSubordinateSuspend());
    setIsUpdateModalOpen(false);
  }

  const isLoading = updateStatus === LOADING_UPDATE_SUBORDINATE;

  const isActive = canDrop && isOver;
  const { isSelf } = teamManager;

  let teamClass = s.team;
  if (isActive)
    teamClass = s.activeTeam;
  else if (!canDrop && isOver)
    teamClass = s.notDroppableTeam;

  if (isSelf)
    teamClass = `${teamClass} ${s.selfTeam}`;

  const modalTitle = `Assign ${droppedEmployee.fullName} to ${teamManager.fullName}`;
  const tooltipContent = `${teamManager.managedEmployeesCount} employees in this team`;

  return (
    <>
      <ModalWrapper
        onOk={onUpdateSubordinate}
        isOpen={isUpdateModalOpen}
        onClose={onCloseModal}
        isLoading={isLoading}
        title={modalTitle}
        text="Do you really want to reassign this subordinate to another team?"
      />
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
    </>
  );
};

export default Team;
