import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_LEARNING_DAYS_START, FETCH_LEARNING_DAYS_SUCCESS, FETCH_LEARNING_DAYS_FAIL, START_LEARNING_DAY_START, START_LEARNING_DAY_SUCCESS, START_LEARNING_DAY_FAIL,
} from './types/learningDays';
import { getLocalIsoString } from '../../utils/dateParser';

const fetchLearningDaysStart = makeSyncActionCreator(FETCH_LEARNING_DAYS_START);
const fetchLearningDaysSuccess = makeSyncActionCreator(FETCH_LEARNING_DAYS_SUCCESS);
const fetchLearningDaysFail = makeSyncActionCreator(FETCH_LEARNING_DAYS_FAIL);

const startLearningDayStart = makeSyncActionCreator(START_LEARNING_DAY_START);
const startLearningDaySuccess = makeSyncActionCreator(START_LEARNING_DAY_SUCCESS);
const startLearningDayFail = makeSyncActionCreator(START_LEARNING_DAY_FAIL);

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

const startLearningDay = date => async dispatch => {
  try {
    dispatch(startLearningDayStart());

    const learningDay = {
      date: getLocalIsoString(date),
      comments: '',
      topicIds: [],
    };

    const response = await Axios.post('learning-days/learning-day', learningDay);
    const { id } = response.data;

    dispatch(startLearningDaySuccess(id));
  } catch (err) {
    dispatch(startLearningDayFail());
  }
};

export { getLearningDays, startLearningDay };
