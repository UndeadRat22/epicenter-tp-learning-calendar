import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_MY_TEAM_TREE_START, FETCH_MY_TEAM_TREE_SUCCESS, FETCH_MY_TEAM_TREE_FAIL } from './types/myTeamTree';

const fetchMyTeamTreeStart = makeSyncActionCreator(FETCH_MY_TEAM_TREE_START);
const fetchMyTeamTreeSuccess = makeSyncActionCreator(FETCH_MY_TEAM_TREE_SUCCESS);
const fetchMyTeamTreeFail = makeSyncActionCreator(FETCH_MY_TEAM_TREE_FAIL);

const getMyTeamTree = () => async dispatch => {
  try {
    dispatch(fetchMyTeamTreeStart());
    const response = await Axios.get('teams/team/topics/tree/self');
    const myTeamTree = response.data;
    dispatch(fetchMyTeamTreeSuccess(myTeamTree.topicRoots));
  } catch (err) {
    dispatch(fetchMyTeamTreeFail());
  }
};

export { getMyTeamTree };
