import {
  SAVING_GOALS, SAVE_GOALS_SUCCEEDED, SAVE_GOALS_FAILED, SAVE_GOALS_INACTIVE,
} from '../../constants/AssignGoalsStatus';
import {
  ASSIGN_GOAL, ASSIGN_PERSONAL_GOAL, REMOVE_GOAL, REMOVE_PERSONAL_GOAL, SAVE_GOALS_START, SAVE_GOALS_SUCCESS, SAVE_GOALS_FAIL, RESET_GOALS,
} from '../actions/types/assignGoals';

const initialState = {
  saveGoalsStatus: SAVE_GOALS_INACTIVE,
  newGoals: [],
  newPersonalGoals: [],
};

const assignGoals = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_GOAL:
      return {
        ...state,
        saveGoalsStatus: SAVE_GOALS_INACTIVE,
        newGoals: [...state.newGoals, action.payload],
      };
    case ASSIGN_PERSONAL_GOAL:
      return {
        ...state,
        saveGoalsStatus: SAVE_GOALS_INACTIVE,
        newPersonalGoals: [...state.newPersonalGoals, action.payload],
      };
    case REMOVE_GOAL: {
      const goalToRemove = state.newGoals.find(goal => goal.employeeId === action.payload.employeeId && goal.topic.topicId === action.payload.topicId);
      const remainingGoals = state.newGoals;
      remainingGoals.splice(state.newGoals.indexOf(goalToRemove), 1);
      return {
        ...state,
        newGoals: remainingGoals,
      };
    }
    case REMOVE_PERSONAL_GOAL: {
      const goalToRemove = state.newPersonalGoals.find(goal => goal.topic.topicId === action.payload.topicId);
      const remainingPersonalGoals = state.newPersonalGoals;
      remainingPersonalGoals.splice(state.newPersonalGoals.indexOf(goalToRemove), 1);
      return {
        ...state,
        newPersonalGoals: remainingPersonalGoals,
      };
    }
    case SAVE_GOALS_START:
      return {
        ...state,
        saveGoalsStatus: SAVING_GOALS,
      };
    case SAVE_GOALS_SUCCESS: {
      return {
        ...state,
        saveGoalsStatus: SAVE_GOALS_SUCCEEDED,
        newGoals: [],
        newPersonalGoals: [],
      };
    }
    case SAVE_GOALS_FAIL:
      return {
        ...state,
        saveGoalsStatus: SAVE_GOALS_FAILED,
      };
    case RESET_GOALS:
      return {
        ...state,
        saveGoalsStatus: SAVE_GOALS_INACTIVE,
        newGoals: [],
        newPersonalGoals: [],
      };
    default:
      return state;
  }
};

export default assignGoals;
