import Axios from 'axios';
import { getLocalIsoString } from '../../utils/dateParser';
import makeSyncActionCreator from '../syncActionCreator';
import { getLimits } from './limits';
import { getPersonalGoals } from './personalGoals';
import { showErrorToast, showSuccessToast } from './toast';
import { getLearnedTopics } from './topic';
import {
  CANCEL_LEARNING_DAY_FAIL, CANCEL_LEARNING_DAY_START, CANCEL_LEARNING_DAY_SUCCESS, CANCEL_LEARNING_DAY_SUSPEND, FETCH_LEARNING_DAYS_FAIL, FETCH_LEARNING_DAYS_START, FETCH_LEARNING_DAYS_SUCCESS, START_LEARNING_DAY_FAIL, START_LEARNING_DAY_START, START_LEARNING_DAY_SUCCESS, START_LEARNING_DAY_SUSPEND, UPDATE_LEARNING_DAY_FAIL, UPDATE_LEARNING_DAY_START, UPDATE_LEARNING_DAY_SUCCESS, UPDATE_LEARNING_DAY_SUSPEND,
} from './types/learningDays';

const fetchLearningDaysStart = makeSyncActionCreator(FETCH_LEARNING_DAYS_START);
const fetchLearningDaysSuccess = makeSyncActionCreator(FETCH_LEARNING_DAYS_SUCCESS);
const fetchLearningDaysFail = makeSyncActionCreator(FETCH_LEARNING_DAYS_FAIL);

const startLearningDayStart = makeSyncActionCreator(START_LEARNING_DAY_START);
const startLearningDaySuccess = makeSyncActionCreator(START_LEARNING_DAY_SUCCESS);
const startLearningDayFail = makeSyncActionCreator(START_LEARNING_DAY_FAIL);
const suspendStartLearningDay = makeSyncActionCreator(START_LEARNING_DAY_SUSPEND);

const cancelLearningDayStart = makeSyncActionCreator(CANCEL_LEARNING_DAY_START);
const cancelLearningDaySuccess = makeSyncActionCreator(CANCEL_LEARNING_DAY_SUCCESS);
const cancelLearningDayFail = makeSyncActionCreator(CANCEL_LEARNING_DAY_FAIL);
const suspendCancelLearningDay = makeSyncActionCreator(CANCEL_LEARNING_DAY_SUSPEND);

const updateLearningDayStart = makeSyncActionCreator(UPDATE_LEARNING_DAY_START);
const updateLearningDaySuccess = makeSyncActionCreator(UPDATE_LEARNING_DAY_SUCCESS);
const updateLearningDayFail = makeSyncActionCreator(UPDATE_LEARNING_DAY_FAIL);
const suspendUpdateLearningDay = makeSyncActionCreator(UPDATE_LEARNING_DAY_SUSPEND);

const cancelLearningDay = (id, date) => async dispatch => {
  try {
    dispatch(cancelLearningDayStart());

    await Axios.delete(`learning-days/learning-day/${id}`);

    dispatch(cancelLearningDaySuccess());
    dispatch(showSuccessToast('Successfully cancelled learning lay'));
    dispatch(getLimits(date));
    dispatch(getPersonalGoals());
    dispatch(getLearningDays());
  } catch (err) {
    dispatch(showErrorToast('Failed to cancel learning day'));
    dispatch(cancelLearningDayFail());
  } finally {
    dispatch(suspendCancelLearningDay());
  }
};

const getLearningDays = () => async dispatch => {
  try {
    dispatch(fetchLearningDaysStart());

    const responseSelf = await Axios.get('learning-days');
    const selfLearningDays = responseSelf.data.learningDays;

    const responseTeam = await Axios.get('learning-days/subordinates');
    const teamLearningDays = responseTeam.data.learningDays;

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
    dispatch(showSuccessToast('Added Learning Day'));
    dispatch(getLearningDays());
    dispatch(getLimits(date));
  } catch (err) {
    dispatch(showErrorToast('Failed to add learning day'));
    console.log(err.response);
    dispatch(startLearningDayFail());
  } finally {
    dispatch(suspendStartLearningDay());
  }
};

const updateLearningDay = ({
  learningDayId, comments, learningDayTopics, date, employee,
}) => async (dispatch, getState) => {
  try {
    dispatch(updateLearningDayStart());

    console.log('PUT learning-days/learning-day', { learningDayId, comments, learningDayTopics });

    await Axios.put('learning-days/learning-day', {
      learningDayId, comments, learningDayTopics,
    });

    // redux format (same as GET from backend)
    const updatedTopics = learningDayTopics
      .map(topic => ({ id: topic.topicId, subject: topic.subject, progressStatus: topic.progressStatus }));

    const updatedLearningDay = {
      id: learningDayId, comments, topics: updatedTopics, date, employee,
    };

    const isSelfLearningDay = getState().learningDays.selfLearningDays.some(day => day.id === learningDayId);

    let nextSelfLearningDays = getState().learningDays.selfLearningDays;
    let nextTeamLearningDays = getState().learningDays.teamLearningDays;

    if (isSelfLearningDay) {
      nextSelfLearningDays = getState().learningDays.selfLearningDays
        .map(day => (day.id === learningDayId ? updatedLearningDay : day));
    } else {
      nextTeamLearningDays = getState().learningDays.teamLearningDays
        .map(day => (day.id === learningDayId ? updatedLearningDay : day));
    }

    dispatch(updateLearningDaySuccess({ nextSelfLearningDays, nextTeamLearningDays, updatedLearningDayId: learningDayId }));
    dispatch(getPersonalGoals());
    dispatch(getLearnedTopics());
  } catch (err) {
    console.log(err.response);
    dispatch(updateLearningDayFail(learningDayId));
  } finally {
    dispatch(suspendUpdateLearningDay());
  }
};

export {
  getLearningDays, startLearningDay, suspendStartLearningDay, suspendCancelLearningDay, cancelLearningDay, updateLearningDay, suspendUpdateLearningDay,
};
