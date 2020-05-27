import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'wix-style-react';
import {
  getAllTopics, getMyTeam, saveGoals, resetGoals, getPersonalGoals, getLimits,
} from '../state/actions';
import { SAVE_GOALS_SUCCEEDED, SAVE_GOALS_FAILED } from '../constants/AssignGoalsStatus';
import GoalsAssignComponent from '../components/myTeam/GoalsAssignComponent';
import ResetSaveButtonBox from '../components/ResetSaveButtonsBox';

const MyTeam = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTopics());
    dispatch(getMyTeam());
    dispatch(getPersonalGoals());
    dispatch(getLimits());
  }, [dispatch]);

  const onReset = () => {
    dispatch(resetGoals());
  };

  const onSave = () => {
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

  const savingSucceeded = saveGoalsStatus === SAVE_GOALS_SUCCEEDED;
  const savingFailed = saveGoalsStatus === SAVE_GOALS_FAILED;

  const changesMade = newGoals.length > 0 || newPersonalGoals.length > 0;

  return (
    <Page>
      <Page.Header
        title="My Team"
        subtitle="Here you can assign goals to your team members and adjust their learning day limits"
        actionsBar={<ResetSaveButtonBox anyChangesMade={changesMade} onReset={onReset} onSave={onSave} savingSucceeded={savingSucceeded} savingFailed={savingFailed} />}
      />
      <Page.Content>
        <GoalsAssignComponent />
      </Page.Content>
    </Page>
  );
};

export default MyTeam;
