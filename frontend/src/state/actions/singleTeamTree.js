import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_SINGLE_TEAM_TREE_START, FETCH_SINGLE_TEAM_TREE_SUCCESS, FETCH_SINGLE_TEAM_TREE_FAIL, SUSPEND_SINGLE_TEAM_TREE,
} from './types/singleTeamTree';

const fetchSingleTeamTreeStart = makeSyncActionCreator(FETCH_SINGLE_TEAM_TREE_START);
const fetchSingleTeamTreeSuccess = makeSyncActionCreator(FETCH_SINGLE_TEAM_TREE_SUCCESS);
const fetchSingleTeamTreeFail = makeSyncActionCreator(FETCH_SINGLE_TEAM_TREE_FAIL);
const suspendSingleTeamTree = makeSyncActionCreator(SUSPEND_SINGLE_TEAM_TREE);

const getSingleTeamTree = teamId => async dispatch => {
  try {
    dispatch(fetchSingleTeamTreeStart());
    const response = await Axios.get('teams/team/topics/tree/'.concat(teamId));
    const singleTeamTree = response.data;
    dispatch(fetchSingleTeamTreeSuccess(singleTeamTree.topicRoots));
  } catch (err) {
    dispatch(fetchSingleTeamTreeFail());
  } finally {
    dispatch(suspendSingleTeamTree());
  }
};

export { getSingleTeamTree };
