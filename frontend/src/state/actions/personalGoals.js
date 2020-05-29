import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_PERSONAL_GOALS_START, FETCH_PERSONAL_GOALS_SUCCESS, FETCH_PERSONAL_GOALS_FAIL,
  ADD_SELF_PERSONAL_GOAL_START, ADD_SELF_PERSONAL_GOAL_FAIL, ADD_SELF_PERSONAL_GOAL_SUCCESS,
  SUSPEND_ADD_SELF_PERSONAL_GOAL,
  MARK_GOAL_LEARNED_START,
  MARK_GOAL_LEARNED_FAIL,
  MARK_GOAL_LEARNED_SUCCESS,
  SUSPEND_MARK_GOAL_LEARNED,
} from './types/personalGoals';
import { showErrorToast } from './toast';
import { getLearnedTopics } from './topic';

const fetchPersonalGoalsStart = makeSyncActionCreator(FETCH_PERSONAL_GOALS_START);
const fetchPersonalGoalsSuccess = makeSyncActionCreator(FETCH_PERSONAL_GOALS_SUCCESS);
const fetchPersonalGoalsFail = makeSyncActionCreator(FETCH_PERSONAL_GOALS_FAIL);

const addSelfPersonalGoalStart = makeSyncActionCreator(ADD_SELF_PERSONAL_GOAL_START);
const addSelfPersonalGoalFail = makeSyncActionCreator(ADD_SELF_PERSONAL_GOAL_FAIL);
const addSelfPersonalGoalSuccess = makeSyncActionCreator(ADD_SELF_PERSONAL_GOAL_SUCCESS);
const suspendAddSelfPersonalGoal = makeSyncActionCreator(SUSPEND_ADD_SELF_PERSONAL_GOAL);

const markGoalLearnedStart = makeSyncActionCreator(MARK_GOAL_LEARNED_START);
const markGoalLearnedFail = makeSyncActionCreator(MARK_GOAL_LEARNED_FAIL);
const markGoalLearnedSuccess = makeSyncActionCreator(MARK_GOAL_LEARNED_SUCCESS);
const suspendMarkGoalLearned = makeSyncActionCreator(SUSPEND_MARK_GOAL_LEARNED);

const getPersonalGoals = () => async dispatch => {
  try {
    dispatch(fetchPersonalGoalsStart());
    const response = await Axios.get('personal-goals/employee/self');
    const personalGoals = response.data;
    dispatch(fetchPersonalGoalsSuccess(personalGoals.goals));
  } catch (err) {
    console.log(err.response);
    dispatch(fetchPersonalGoalsFail());
  }
};

const addSelfPersonalGoal = topicId => async dispatch => {
  try {
    dispatch(addSelfPersonalGoalStart());

    await Axios.post('personal-goals/employee/self', { topicIds: [topicId] });

    dispatch(addSelfPersonalGoalSuccess());
    dispatch(getLearnedTopics());
    dispatch(getPersonalGoals());
  } catch (err) {
    console.log(err.response);
    dispatch(showErrorToast('Failed to add goal'));
    dispatch(addSelfPersonalGoalFail());
  } finally {
    dispatch(suspendAddSelfPersonalGoal());
  }
};

const markGoalLearned = topicId => async dispatch => {
  try {
    dispatch(markGoalLearnedStart());

    await Axios.post('topics/learn', { topicId });

    dispatch(markGoalLearnedSuccess());
    dispatch(getLearnedTopics());
    dispatch(getPersonalGoals());
  } catch (err) {
    console.log(err.response.data);
    dispatch(showErrorToast('Something went wrong'));
    dispatch(markGoalLearnedFail());
  } finally {
    dispatch(suspendMarkGoalLearned());
  }
};

export { getPersonalGoals, addSelfPersonalGoal, markGoalLearned };
