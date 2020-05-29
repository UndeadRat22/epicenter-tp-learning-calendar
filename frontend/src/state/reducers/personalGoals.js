import {
  LOADING_PERSONAL_GOALS, FETCH_PERSONAL_GOALS_SUCCEEDED, FETCH_PERSONAL_GOALS_FAILED, INACTIVE_ADD_SELF_PERSONAL_GOAL, LOADING_ADD_SELF_PERSONAL_GOAL, ADD_SELF_PERSONAL_GOAL_FAILED, ADD_SELF_PERSONAL_GOAL_SUCCEEDED, INACTIVE_MARK_GOAL_LEARNED, LOADING_MARK_GOAL_LEARNED, MARK_GOAL_LEARNED_FAILED, MARK_GOAL_LEARNED_SUCCEEDED,
} from '../../constants/PersonalGoalsStatus';
import {
  FETCH_PERSONAL_GOALS_START, FETCH_PERSONAL_GOALS_SUCCESS, FETCH_PERSONAL_GOALS_FAIL, ADD_SELF_PERSONAL_GOAL_START, ADD_SELF_PERSONAL_GOAL_FAIL, ADD_SELF_PERSONAL_GOAL_SUCCESS, SUSPEND_ADD_SELF_PERSONAL_GOAL, MARK_GOAL_LEARNED_START, MARK_GOAL_LEARNED_FAIL, MARK_GOAL_LEARNED_SUCCESS, SUSPEND_MARK_GOAL_LEARNED,
} from '../actions/types/personalGoals';

const initialState = {
  status: '',
  addSelfPersonalGoalStatus: INACTIVE_ADD_SELF_PERSONAL_GOAL,
  markGoalLearnedStatus: INACTIVE_MARK_GOAL_LEARNED,
  goals: [],
};

const personalGoals = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_GOALS_START:
      return {
        ...state,
        status: LOADING_PERSONAL_GOALS,
      };
    case FETCH_PERSONAL_GOALS_SUCCESS:
      return {
        ...state,
        status: FETCH_PERSONAL_GOALS_SUCCEEDED,
        goals: action.payload,
      };
    case FETCH_PERSONAL_GOALS_FAIL:
      return {
        ...state,
        status: FETCH_PERSONAL_GOALS_FAILED,
      };
    case ADD_SELF_PERSONAL_GOAL_START:
      return {
        ...state,
        addSelfPersonalGoalStatus: LOADING_ADD_SELF_PERSONAL_GOAL,
      };
    case ADD_SELF_PERSONAL_GOAL_FAIL:
      return {
        ...state,
        addSelfPersonalGoalStatus: ADD_SELF_PERSONAL_GOAL_FAILED,
      };
    case ADD_SELF_PERSONAL_GOAL_SUCCESS:
      return {
        ...state,
        addSelfPersonalGoalStatus: ADD_SELF_PERSONAL_GOAL_SUCCEEDED,
      };
    case SUSPEND_ADD_SELF_PERSONAL_GOAL:
      return {
        ...state,
        addSelfPersonalGoalStatus: INACTIVE_ADD_SELF_PERSONAL_GOAL,
      };
    case MARK_GOAL_LEARNED_START:
      return {
        ...state,
        markGoalLearnedStatus: LOADING_MARK_GOAL_LEARNED,
      };
    case MARK_GOAL_LEARNED_FAIL:
      return {
        ...state,
        markGoalLearnedStatus: MARK_GOAL_LEARNED_FAILED,
      };
    case MARK_GOAL_LEARNED_SUCCESS:
      return {
        ...state,
        markGoalLearnedStatus: MARK_GOAL_LEARNED_SUCCEEDED,
      };
    case SUSPEND_MARK_GOAL_LEARNED:
      return {
        ...state,
        markGoalLearnedStatus: INACTIVE_MARK_GOAL_LEARNED,
      };
    default:
      return state;
  }
};

export default personalGoals;
