import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  ASSIGN_GOAL, ASSIGN_TEAM_GOAL, ASSIGN_PERSONAL_GOAL, REMOVE_GOAL, REMOVE_PERSONAL_GOAL, SAVE_GOALS_START, SAVE_GOALS_SUCCESS, SAVE_GOALS_FAIL, RESET_GOALS,
} from './types/assignGoals';
import { getPersonalGoals } from './personalGoals';
import { getMyTeam } from './myTeam';

const assignGoal = makeSyncActionCreator(ASSIGN_GOAL);
const assignTeamGoal = makeSyncActionCreator(ASSIGN_TEAM_GOAL);
const assignPersonalGoal = makeSyncActionCreator(ASSIGN_PERSONAL_GOAL);

const removeGoal = makeSyncActionCreator(REMOVE_GOAL);
const removePersonalGoal = makeSyncActionCreator(REMOVE_PERSONAL_GOAL);

const saveGoalsStart = makeSyncActionCreator(SAVE_GOALS_START);
const saveGoalsSuccess = makeSyncActionCreator(SAVE_GOALS_SUCCESS);
const saveGoalsFail = makeSyncActionCreator(SAVE_GOALS_FAIL);

const saveGoals = ({ newGoals, newPersonalGoals }) => async dispatch => {
  try {
    dispatch(saveGoalsStart());

    const promises = [];
    if (newGoals.length > 0)
      promises.push(...newGoals.map(employeeGoals => Axios.post('personal-goals/employee', employeeGoals)));

    const newPersonalGoalTopicIds = newPersonalGoals.map(goal => goal.topic.topicId);
    if (newPersonalGoalTopicIds.length > 0)
      promises.push(Axios.post('personal-goals/employee/self', { topicIds: newPersonalGoalTopicIds }));

    await Promise.all(promises);
    dispatch(saveGoalsSuccess({ newGoals, newPersonalGoals }));

    if (promises.length > 0) {
      dispatch(getPersonalGoals());
      dispatch(getMyTeam());
    }
  } catch (err) {
    dispatch(saveGoalsFail());
  }
};

const resetGoals = makeSyncActionCreator(RESET_GOALS);

export {
  assignGoal, assignTeamGoal, assignPersonalGoal, removeGoal, removePersonalGoal, saveGoals, resetGoals,
};
