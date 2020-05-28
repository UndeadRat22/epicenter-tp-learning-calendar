import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_MY_SUBORDINATES_TREE_START, FETCH_MY_SUBORDINATES_TREE_SUCCESS, FETCH_MY_SUBORDINATES_TREE_FAIL, SUSPEND_MY_SUBORDINATES_TREE,
} from './types/mySubordinatesTree';

const fetchMySubordinatesTreeStart = makeSyncActionCreator(FETCH_MY_SUBORDINATES_TREE_START);
const fetchMySubordinatesTreeSuccess = makeSyncActionCreator(FETCH_MY_SUBORDINATES_TREE_SUCCESS);
const fetchMySubordinatesTreeFail = makeSyncActionCreator(FETCH_MY_SUBORDINATES_TREE_FAIL);
const suspendMySubordinatesTree = makeSyncActionCreator(SUSPEND_MY_SUBORDINATES_TREE);

const getMySubordinatesTree = () => async dispatch => {
  try {
    dispatch(fetchMySubordinatesTreeStart());
    const response = await Axios.get('teams/topics/tree/self');
    const mySubordinatesTree = response.data;
    dispatch(fetchMySubordinatesTreeSuccess(mySubordinatesTree.topicRoots));
  } catch (err) {
    dispatch(fetchMySubordinatesTreeFail());
  } finally {
    dispatch(suspendMySubordinatesTree());
  }
};

export { getMySubordinatesTree };
