import {
  NO_NEW_GOALS, NEW_GOALS_ADDED, SAVING_GOALS, SAVE_GOALS_SUCCEEDED, SAVE_GOALS_FAILED,
} from '../../constants/AssignGoalsStatus';
import {
  ASSIGN_GOAL, ASSIGN_PERSONAL_GOAL, REMOVE_GOAL, REMOVE_PERSONAL_GOAL, SAVE_GOALS_START, SAVE_GOALS_SUCCESS, SAVE_GOALS_FAIL, RESET_GOALS,
} from '../actions/types/assignGoals';

const initialState = {
  saveGoalsStatus: '',
  newGoalsStatus: NO_NEW_GOALS,
  newGoals: [],
  newPersonalGoals: [],
};

const assignGoals = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_GOAL:
      return {
        ...state,
        newGoalsStatus: NEW_GOALS_ADDED,
        newGoals: [...state.newGoals, action.payload],
      };
    case ASSIGN_PERSONAL_GOAL:
      return {
        ...state,
        newGoalsStatus: NEW_GOALS_ADDED,
        newPersonalGoals: [...state.newPersonalGoals, action.payload],
      };
    case REMOVE_GOAL: {
      const goalToRemove = state.newGoals.find(goal => goal.employeeId === action.payload.employeeId && goal.topic.topicId === action.payload.topicId);
      const remainingGoals = state.newGoals;
      remainingGoals.splice(state.newGoals.indexOf(goalToRemove), 1);
      const status = remainingGoals.length > 0 && state.newPersonalGoals.length > 0 ? NEW_GOALS_ADDED : NO_NEW_GOALS;
      return {
        ...state,
        newGoalsStatus: status,
        newGoals: remainingGoals,
      };
    }
    case REMOVE_PERSONAL_GOAL:
      return {
        ...state,
        // TODO
      };
    case SAVE_GOALS_START:
      return {
        ...state,
        saveGoalsStatus: SAVING_GOALS,
      };
    case SAVE_GOALS_SUCCESS: {
      return {
        ...state,
        saveGoalsStatus: SAVE_GOALS_SUCCEEDED,
        newGoalsStatus: NO_NEW_GOALS,
        // newGoals: [],
        // newPersonalGoals: [],
      };
    }
    case SAVE_GOALS_FAIL:
      return {
        ...state,
        saveGoalsStatus: SAVE_GOALS_FAILED,
      };
    case RESET_GOALS:
      return {
        // ...state, OR saveGoalsStatus: '', ?
        ...state,
        newGoalsStatus: NO_NEW_GOALS,
        newGoals: [],
        newPersonalGoals: [],
      };
    default:
      return state;
  }
};

export default assignGoals;
