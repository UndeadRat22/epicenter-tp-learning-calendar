import {
  INACTIVE_FETCH_LEARNING_DAYS, LOADING_FETCH_LEARNING_DAYS, FETCH_LEARNING_DAYS_FAILED, FETCH_LEARNING_DAYS_SUCCEEDED, LOADING_START_LEARNING_DAY, START_LEARNING_DAY_FAILED, START_LEARNING_DAY_SUCCEEDED, INACTIVE_START_LEARNING_DAY,
} from '../../constants/LearningDaysStatus';
import {
  FETCH_LEARNING_DAYS_START, FETCH_LEARNING_DAYS_FAIL, FETCH_LEARNING_DAYS_SUCCESS, START_LEARNING_DAY_FAIL, START_LEARNING_DAY_SUCCESS, START_LEARNING_DAY_START, START_LEARNING_DAY_SUSPEND,
} from '../actions/types/learningDays';

const initialState = {
  status: INACTIVE_FETCH_LEARNING_DAYS,
  startStatus: INACTIVE_START_LEARNING_DAY,
  startedLearningDayId: null,
  selfLearningDays: [],
  teamLearningDays: [],
};

const learningDays = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARNING_DAYS_START:
      return {
        ...state,
        status: LOADING_FETCH_LEARNING_DAYS,
        selfLearningDays: [],
        teamLearningDays: [],
      };
    case FETCH_LEARNING_DAYS_FAIL:
      return {
        ...state,
        status: FETCH_LEARNING_DAYS_FAILED,
        selfLearningDays: [],
        teamLearningDays: [],
      };
    case FETCH_LEARNING_DAYS_SUCCESS:
      return {
        ...state,
        status: FETCH_LEARNING_DAYS_SUCCEEDED,
        selfLearningDays: action.payload.selfLearningDays,
        teamLearningDays: action.payload.teamLearningDays,
      };
    case START_LEARNING_DAY_SUSPEND:
      return {
        ...state,
        startStatus: INACTIVE_START_LEARNING_DAY,
      };
    case START_LEARNING_DAY_START:
      return {
        ...state,
        startStatus: LOADING_START_LEARNING_DAY,
      };
    case START_LEARNING_DAY_SUCCESS:
      return {
        ...state,
        startStatus: START_LEARNING_DAY_SUCCEEDED,
        startedLearningDayId: action.payload,
      };
    case START_LEARNING_DAY_FAIL:
      return {
        ...state,
        startStatus: START_LEARNING_DAY_FAILED,
      };

    default:
      return state;
  }
};

export default learningDays;
