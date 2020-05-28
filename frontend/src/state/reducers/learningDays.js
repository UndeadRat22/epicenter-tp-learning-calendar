import {
  INACTIVE_FETCH_LEARNING_DAYS, LOADING_FETCH_LEARNING_DAYS, FETCH_LEARNING_DAYS_FAILED, FETCH_LEARNING_DAYS_SUCCEEDED, LOADING_START_LEARNING_DAY, START_LEARNING_DAY_FAILED, START_LEARNING_DAY_SUCCEEDED, INACTIVE_START_LEARNING_DAY, INACTIVE_CANCEL_LEARNING_DAY, LOADING_CANCEL_LEARNING_DAY, CANCEL_LEARNING_DAY_SUCCEEDED, CANCEL_LEARNING_DAY_FAILED, UPDATE_LEARNING_DAY_FAILED, UPDATE_LEARNING_DAY_SUCCEEDED, INACTIVE_UPDATE_LEARNING_DAY, LOADING_UPDATE_LEARNING_DAY,
} from '../../constants/LearningDaysStatus';
import {
  FETCH_LEARNING_DAYS_START, FETCH_LEARNING_DAYS_FAIL, FETCH_LEARNING_DAYS_SUCCESS, START_LEARNING_DAY_FAIL, START_LEARNING_DAY_SUCCESS, START_LEARNING_DAY_START, START_LEARNING_DAY_SUSPEND, CANCEL_LEARNING_DAY_SUSPEND, CANCEL_LEARNING_DAY_START, CANCEL_LEARNING_DAY_SUCCESS, CANCEL_LEARNING_DAY_FAIL, UPDATE_LEARNING_DAY_START, UPDATE_LEARNING_DAY_FAIL, UPDATE_LEARNING_DAY_SUSPEND, UPDATE_LEARNING_DAY_SUCCESS,
} from '../actions/types/learningDays';

const initialState = {
  status: INACTIVE_FETCH_LEARNING_DAYS,
  startStatus: INACTIVE_START_LEARNING_DAY,
  updateStatus: INACTIVE_CANCEL_LEARNING_DAY,
  startedLearningDayId: null,
  cancelStatus: INACTIVE_CANCEL_LEARNING_DAY,
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

    case CANCEL_LEARNING_DAY_SUSPEND:
      return {
        ...state,
        cancelStatus: INACTIVE_CANCEL_LEARNING_DAY,
      };
    case CANCEL_LEARNING_DAY_START:
      return {
        ...state,
        cancelStatus: LOADING_CANCEL_LEARNING_DAY,
      };
    case CANCEL_LEARNING_DAY_SUCCESS:
      return {
        ...state,
        cancelStatus: CANCEL_LEARNING_DAY_SUCCEEDED,
      };
    case CANCEL_LEARNING_DAY_FAIL:
      return {
        ...state,
        cancelStatus: CANCEL_LEARNING_DAY_FAILED,
      };

    case UPDATE_LEARNING_DAY_START:
      return {
        ...state,
        updateStatus: LOADING_UPDATE_LEARNING_DAY,
      };
    case UPDATE_LEARNING_DAY_FAIL:
      return {
        ...state,
        updateStatus: UPDATE_LEARNING_DAY_FAILED,
      };
    case UPDATE_LEARNING_DAY_SUCCESS:
      return {
        ...state,
        updateStatus: UPDATE_LEARNING_DAY_SUCCEEDED,
        selfLearningDays: action.payload.nextSelfLearningDays,
        teamLearningDays: action.payload.nextTeamLearningDays,
      };
    case UPDATE_LEARNING_DAY_SUSPEND:
      return {
        ...state,
        updateStatus: INACTIVE_UPDATE_LEARNING_DAY,
      };
    default:
      return state;
  }
};

export default learningDays;
