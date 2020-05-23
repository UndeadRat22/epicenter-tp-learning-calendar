import {
  INACTIVE_FETCH_LEARNING_DAYS, LOADING_FETCH_LEARNING_DAYS, FETCH_LEARNING_DAYS_FAILED, FETCH_LEARNING_DAYS_SUCCEEDED,
} from '../../constants/LearningDaysStatus';
import { FETCH_LEARNING_DAYS_START, FETCH_LEARNING_DAYS_FAIL, FETCH_LEARNING_DAYS_SUCCESS } from '../actions/types/learningDays';

const initialState = {
  status: INACTIVE_FETCH_LEARNING_DAYS,
  selfLearningDays: [],
  teamLearningDays: [],
};

const learningDays = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARNING_DAYS_START:
      return {
        status: LOADING_FETCH_LEARNING_DAYS,
        selfLearningDays: [],
        teamLearningDays: [],
      };
    case FETCH_LEARNING_DAYS_FAIL:
      return {
        status: FETCH_LEARNING_DAYS_FAILED,
        selfLearningDays: [],
        teamLearningDays: [],
      };
    case FETCH_LEARNING_DAYS_SUCCESS:
      return {
        status: FETCH_LEARNING_DAYS_SUCCEEDED,
        selfLearningDays: action.payload.selfLearningDays,
        teamLearningDays: action.payload.remainingLimit,
      };
    default:
      return state;
  }
};

export default learningDays;
