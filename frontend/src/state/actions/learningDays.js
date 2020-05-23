import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_LEARNING_DAYS_START, FETCH_LEARNING_DAYS_SUCCESS, FETCH_LEARNING_DAYS_FAIL } from './types/learningDays';

const fetchLearningDaysStart = makeSyncActionCreator(FETCH_LEARNING_DAYS_START);
const fetchLearningDaysSuccess = makeSyncActionCreator(FETCH_LEARNING_DAYS_SUCCESS);
const fetchLearningDaysFail = makeSyncActionCreator(FETCH_LEARNING_DAYS_FAIL);

const getLearningDays = () => async dispatch => {
  try {
    dispatch(fetchLearningDaysStart());

    const responseSelf = await Axios.get('learning-days');
    const selfLearningDays = responseSelf.data.learningDays;
    console.log('Received self learning days: ');
    console.log(selfLearningDays);

    const responseTeam = await Axios.get('learning-days/subordinates');
    const teamLearningDays = responseTeam.data.learningDays;
    console.log('Received team learning days: ');
    console.log(teamLearningDays);

    dispatch(fetchLearningDaysSuccess({ selfLearningDays, teamLearningDays }));
  } catch (err) {
    dispatch(fetchLearningDaysFail());
  }
};

export { getLearningDays };
