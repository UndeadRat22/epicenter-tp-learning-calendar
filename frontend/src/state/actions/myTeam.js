import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_MY_TEAM_START, FETCH_MY_TEAM_SUCCESS, FETCH_MY_TEAM_FAIL } from './types/myTeam';

const fetchMyTeamStart = makeSyncActionCreator(FETCH_MY_TEAM_START);
const fetchMyTeamSuccess = makeSyncActionCreator(FETCH_MY_TEAM_SUCCESS);
const fetchMyTeamFail = makeSyncActionCreator(FETCH_MY_TEAM_FAIL);

const getMyTeam = () => async dispatch => {
  try {
    dispatch(fetchMyTeamStart());
    const response = await Axios.get('teams/team/self');
    const myTeam = response.data;
    dispatch(fetchMyTeamSuccess(myTeam));
  } catch (err) {
    dispatch(fetchMyTeamFail());
  }
};

export { getMyTeam };
