import {
  LOADING_MY_TEAM, FETCH_MY_TEAM_SUCCEEDED, FETCH_MY_TEAM_FAILED,
} from '../../constants/MyTeamStatus';
import {
  FETCH_MY_TEAM_START, FETCH_MY_TEAM_SUCCESS, FETCH_MY_TEAM_FAIL,
} from '../actions/types';

const initialState = {
  status: '',
  myTeam: {},
};

const myTeam = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_TEAM_START:
      return {
        status: LOADING_MY_TEAM,
        myTeam: {},
      };
    case FETCH_MY_TEAM_SUCCESS:
      return {
        status: FETCH_MY_TEAM_SUCCEEDED,
        myTeam: action.payload,
      };
    case FETCH_MY_TEAM_FAIL:
      return {
        status: FETCH_MY_TEAM_FAILED,
        myTeam: {},
      };
    default:
      return state;
  }
};

export default myTeam;
