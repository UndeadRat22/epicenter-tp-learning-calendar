import {
  LOADING_PERSONAL_GOALS, FETCH_PERSONAL_GOALS_SUCCEEDED, FETCH_PERSONAL_GOALS_FAILED,
} from '../../constants/PersonalGoalsStatus';
import {
  FETCH_PERSONAL_GOALS_START, FETCH_PERSONAL_GOALS_SUCCESS, FETCH_PERSONAL_GOALS_FAIL,
} from '../actions/types';

const initialState = {
  status: '',
  goals: [],
};

const personalGoals = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_GOALS_START:
      return {
        status: LOADING_PERSONAL_GOALS,
        goals: [],
      };
    case FETCH_PERSONAL_GOALS_SUCCESS:
      return {
        status: FETCH_PERSONAL_GOALS_SUCCEEDED,
        goals: action.payload,
      };
    case FETCH_PERSONAL_GOALS_FAIL:
      return {
        status: FETCH_PERSONAL_GOALS_FAILED,
        goals: [],
      };
    default:
      return state;
  }
};

export default personalGoals;
