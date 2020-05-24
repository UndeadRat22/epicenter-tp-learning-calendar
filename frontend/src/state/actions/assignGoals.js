import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  ASSIGN_GOAL, ASSIGN_PERSONAL_GOAL, REMOVE_GOAL, REMOVE_PERSONAL_GOAL, SAVE_GOALS_START, SAVE_GOALS_SUCCESS, SAVE_GOALS_FAIL, RESET_GOALS,
} from './types/assignGoals';

const assignGoal = makeSyncActionCreator(ASSIGN_GOAL);
const assignPersonalGoal = makeSyncActionCreator(ASSIGN_PERSONAL_GOAL);

const removeGoal = makeSyncActionCreator(REMOVE_GOAL);
const removePersonalGoal = makeSyncActionCreator(REMOVE_PERSONAL_GOAL);

const saveGoalsStart = makeSyncActionCreator(SAVE_GOALS_START);
const saveGoalsSuccess = makeSyncActionCreator(SAVE_GOALS_SUCCESS);
const saveGoalsFail = makeSyncActionCreator(SAVE_GOALS_FAIL);

const saveGoals = () => async dispatch => {
  try {
    dispatch(saveGoalsStart());
    // await Axios.post('personal-goals/employee/self', goals);
    setTimeout(() => dispatch(saveGoalsSuccess()), 5000);
    setTimeout(() => dispatch(saveGoalsFail()), 10000);
  } catch (err) {
    dispatch(saveGoalsFail());
  }
};

const resetGoals = makeSyncActionCreator(RESET_GOALS);

export {
  assignGoal, assignPersonalGoal, removeGoal, removePersonalGoal, saveGoals, resetGoals,
};
