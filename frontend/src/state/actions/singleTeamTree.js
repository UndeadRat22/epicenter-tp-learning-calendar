import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_SINGLE_TEAM_TREE_START, FETCH_SINGLE_TEAM_TREE_SUCCESS, FETCH_SINGLE_TEAM_TREE_FAIL } from './types/singleTeamTree';

const fetchSingleTeamTreeStart = makeSyncActionCreator(FETCH_SINGLE_TEAM_TREE_START);
const fetchSingleTeamTreeSuccess = makeSyncActionCreator(FETCH_SINGLE_TEAM_TREE_SUCCESS);
const fetchSingleTeamTreeFail = makeSyncActionCreator(FETCH_SINGLE_TEAM_TREE_FAIL);

const getSingleTeamTree = teamId => async dispatch => {
  try {
    dispatch(fetchSingleTeamTreeStart());
    const response = await Axios.get('teams/team/topics/tree/'.concat(teamId));
    const singleTeamTree = response.data;
    dispatch(fetchSingleTeamTreeSuccess(singleTeamTree.rootTopics));
  } catch (err) {
    dispatch(fetchSingleTeamTreeFail());
  }
};

export { getSingleTeamTree };
