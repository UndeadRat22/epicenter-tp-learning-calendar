import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tooltip } from 'wix-style-react';
import Add from 'wix-ui-icons-common/Add';
import { LOADING_START_LEARNING_DAY, START_LEARNING_DAY_SUCCEEDED, START_LEARNING_DAY_FAILED } from '../../constants/LearningDaysStatus';
import {
  suspendStartLearningDay, getLearningDays, getLimits, startLearningDay,
} from '../../state/actions';
import ModalWrapper from '../modals/ModalWrapper';

const AddLearningDayButton = ({ date, disabled }) => {
  const status = useSelector(state => state.learningDays.startStatus);
  const dispatch = useDispatch();

  const isLoading = status === LOADING_START_LEARNING_DAY;

  const [isStartLearningDayModalOpen, setIsStartLearningDayModalOpen] = useState(false);

  if (status === START_LEARNING_DAY_SUCCEEDED) {
    setIsStartLearningDayModalOpen(false);
    dispatch(suspendStartLearningDay());
  }

  const onStartLearningDay = () => {
    dispatch(startLearningDay(date));
  };

  if (!disabled) {
    return (
      <div style={{ margin: '0 auto' }}>
        <ModalWrapper
          onOk={onStartLearningDay}
          isOpen={isStartLearningDayModalOpen}
          onClose={() => setIsStartLearningDayModalOpen(false)}
          isLoading={isLoading}
          title="Add Learning Day"
          footerText="You can cancel it at any point in the future"
          text="Are you sure you want to add a learning day?"
        />
        <Button
          size="small"
          priority="secondary"
          prefixIcon={<Add />}
          skin="standard"
          onClick={() => setIsStartLearningDayModalOpen(true)}
        >
          Add Learning Day
        </Button>
      </div>
    );
  }

  return (
    <div style={{ margin: '0 auto' }}>
      <Tooltip content="No days per quarter left" placement="left">
        <div>
          <Button
            size="small"
            priority="secondary"
            prefixIcon={<Add />}
            skin="standard"
            disabled
          >
            Add Learning Day
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export default AddLearningDayButton;
