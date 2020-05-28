import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import {
  Avatar, Box, Divider, IconButton, Text,
} from 'wix-style-react';
import { MinusSmall } from 'wix-ui-icons-common';
import ModalWrapper from '../modals/ModalWrapper';
import { EMPLOYEE } from '../../constants/DraggableTypes';
import s from './styles.scss';
import { LOADING_DELETE_SUBORDINATE, DELETE_SUBORDINATE_SUCCEEDED } from '../../constants/SubordinatesStatus';
import { deleteSubordinate, deleteSubordinateSuspend } from '../../state/actions/subordinates';
import { showErrorToast } from '../../state/actions/toast';

const Employee = ({ employee }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    item: { employee, type: EMPLOYEE },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onDeleteClicked = () => {
    if (employee.managedEmployeesCount > 0)
      dispatch(showErrorToast('Cannot delete employees who have direct subordinates'));
    else
      setIsDeleteModalOpen(true);
  };

  const onDeleteSubordinate = () => {
    dispatch(deleteSubordinate({ employeeId: employee.id }));
  };

  const { deleteStatus } = useSelector(state => state.subordinates);

  if (deleteStatus === DELETE_SUBORDINATE_SUCCEEDED) {
    dispatch(deleteSubordinateSuspend());
    setIsDeleteModalOpen(false);
  }

  const isLoading = deleteStatus === LOADING_DELETE_SUBORDINATE;
  const modalTitle = `Delete ${employee.fullName}`;

  const managerText = `Manager: ${employee.managerFullName}`;

  return (
    <>
      <ModalWrapper
        onOk={onDeleteSubordinate}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isLoading}
        title={modalTitle}
        footerText="Once deleted, cannot be undone"
        text="Do you really want to delete this subordinate?"
        alert
      />
      <div className={isDragging ? s.draggedEmployee : s.employee} ref={drag}>
        <Box align="space-between" verticalAlign="middle">
          <Box verticalAlign="middle">
            <Box marginRight="20px">
              <Avatar
                name={employee.fullName}
                color="A2"
                size="size36"
              />
            </Box>
            <Text>
              {employee.fullName}
            </Text>
          </Box>
          <IconButton size="tiny" skin="premium" onClick={onDeleteClicked}>
            <MinusSmall />
          </IconButton>
        </Box>
        <Box marginTop="8px" marginBottom="8px">
          <Divider />
        </Box>
        <Text>{managerText}</Text>
      </div>
    </>
  );
};

export default Employee;
