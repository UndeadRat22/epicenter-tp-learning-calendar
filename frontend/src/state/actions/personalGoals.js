import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_PERSONAL_GOALS_START, FETCH_PERSONAL_GOALS_SUCCESS, FETCH_PERSONAL_GOALS_FAIL,
  ADD_SELF_PERSONAL_GOAL_START, ADD_SELF_PERSONAL_GOAL_FAIL, ADD_SELF_PERSONAL_GOAL_SUCCESS,
  SUSPEND_ADD_SELF_PERSONAL_GOAL,
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

const getPersonalGoals = () => async dispatch => {
  try {
    dispatch(fetchPersonalGoalsStart());
    const response = await Axios.get('personal-goals/employee/self');
    const personalGoals = response.data;
    dispatch(fetchPersonalGoalsSuccess(personalGoals.goals));
  } catch (err) {
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
    dispatch(showErrorToast('Failed to add goal'));
    dispatch(addSelfPersonalGoalFail());
  } finally {
    dispatch(suspendAddSelfPersonalGoal());
  }
};

export { getPersonalGoals, addSelfPersonalGoal };
