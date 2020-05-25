import {
  LOADING_PERSONAL_GOALS, FETCH_PERSONAL_GOALS_SUCCEEDED, FETCH_PERSONAL_GOALS_FAILED,
} from '../../constants/PersonalGoalsStatus';
import {
  FETCH_PERSONAL_GOALS_START, FETCH_PERSONAL_GOALS_SUCCESS, FETCH_PERSONAL_GOALS_FAIL,
} from '../actions/types/personalGoals';

const initialState = {
  status: '',
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
        status: FETCH_PERSONAL_GOALS_SUCCEEDED,
        goals: action.payload,
      };
    case FETCH_PERSONAL_GOALS_FAIL:
      return {
        ...state,
        status: FETCH_PERSONAL_GOALS_FAILED,
      };
    default:
      return state;
  }
};

export default personalGoals;
