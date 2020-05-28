import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_SINGLE_SUBORDINATE_TREE_START, FETCH_SINGLE_SUBORDINATE_TREE_SUCCESS, FETCH_SINGLE_SUBORDINATE_TREE_FAIL, SUSPEND_SINGLE_SUBORDINATE_TREE,
} from './types/singleSubordinateTree';

const fetchSingleSubordinateTreeStart = makeSyncActionCreator(FETCH_SINGLE_SUBORDINATE_TREE_START);
const fetchSingleSubordinateTreeSuccess = makeSyncActionCreator(FETCH_SINGLE_SUBORDINATE_TREE_SUCCESS);
const fetchSingleSubordinateTreeFail = makeSyncActionCreator(FETCH_SINGLE_SUBORDINATE_TREE_FAIL);
const suspendSingleSubordinateTree = makeSyncActionCreator(SUSPEND_SINGLE_SUBORDINATE_TREE);

const getSingleSubordinateTree = subordinateId => async dispatch => {
  try {
    dispatch(fetchSingleSubordinateTreeStart());
    const response = await Axios.get('topics/employee/'.concat(subordinateId));
    const singleSubordinateTree = response.data;
    dispatch(fetchSingleSubordinateTreeSuccess(singleSubordinateTree.topicRoots));
  } catch (err) {
    dispatch(fetchSingleSubordinateTreeFail());
  } finally {
    dispatch(suspendSingleSubordinateTree());
  }
};

export { getSingleSubordinateTree };
