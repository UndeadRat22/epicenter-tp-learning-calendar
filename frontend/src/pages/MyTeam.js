import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Box, Page, Loader,
} from 'wix-style-react';
import { Check, X } from 'wix-ui-icons-common';
import {
  getAllTopics, getMyTeam, saveGoals, resetGoals,
} from '../state/actions';
import { SAVING_GOALS, SAVE_GOALS_SUCCEEDED, SAVE_GOALS_FAILED } from '../constants/AssignGoalsStatus';
import GoalsAssignComponent from '../components/myTeam/GoalsAssignComponent';

const MyTeam = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTopics());
    dispatch(getMyTeam());
  }, [dispatch]);

  const reset = () => {
    dispatch(resetGoals());
  };

  const save = () => {
    dispatch(saveGoals({ newGoals: groupGoals(newGoals, goal => goal.employeeId), newPersonalGoals }));
  };

  const groupGoals = (array, key) => {
    return array.reduce((groupedArray, goal) => {
      const employeeId = key instanceof Function ? key(goal) : goal[key];
      const groupedEmployee = groupedArray.find(employee => employee && employee.employeeId === employeeId);
      if (groupedEmployee)
        groupedEmployee.topicIds.push(goal.topic.topicId);
      else
        groupedArray.push({ employeeId, topicIds: [goal.topic.topicId] });
      return groupedArray;
    }, []);
  };

  const { saveGoalsStatus, newGoals, newPersonalGoals } = useSelector(state => state.assignGoals);

  const savingInProgress = saveGoalsStatus === SAVING_GOALS;
  const savingSucceeded = saveGoalsStatus === SAVE_GOALS_SUCCEEDED;
  const savingFailed = saveGoalsStatus === SAVE_GOALS_FAILED;

  const getSaveButtonAppearance = () => {
    if (savingInProgress) {
      return {
        saveButtonIcon: (
          <Box align="center" verticalAlign="middle">
            <Loader size="tiny" />
          </Box>),
        saveButtonText: 'Saving',
      };
    }

    if (savingSucceeded)
      return { saveButtonIcon: <Check />, saveButtonText: 'Saved' };

    if (savingFailed)
      return { saveButtonIcon: <X />, saveButtonText: 'Failed' };

    return { saveButtonText: 'Save' };
  };

  const { saveButtonIcon, saveButtonText } = getSaveButtonAppearance();

  const ActionsBar = () => (
    <Box>
      <Box marginRight="small">
        <Button skin="light" onClick={reset} disabled={savingInProgress}>
          Reset
        </Button>
      </Box>
      <Box>
        <Button onClick={save} disabled={savingInProgress} prefixIcon={saveButtonIcon}>
          {saveButtonText}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Page height="1000px">
      <Page.Header title="My Team" subtitle="Here you can assign goals to your team members" actionsBar={<ActionsBar />} />
      <Page.Content>
        <GoalsAssignComponent />
      </Page.Content>
    </Page>
  );
};

export default MyTeam;
