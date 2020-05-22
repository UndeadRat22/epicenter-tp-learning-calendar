import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_PERSONAL_GOALS_START, FETCH_PERSONAL_GOALS_SUCCESS, FETCH_PERSONAL_GOALS_FAIL } from './types/personalGoals';

const fetchPersonalGoalsStart = makeSyncActionCreator(FETCH_PERSONAL_GOALS_START);
const fetchPersonalGoalsSuccess = makeSyncActionCreator(FETCH_PERSONAL_GOALS_SUCCESS);
const fetchPersonalGoalsFail = makeSyncActionCreator(FETCH_PERSONAL_GOALS_FAIL);

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

export { getPersonalGoals };
