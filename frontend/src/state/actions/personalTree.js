import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_PERSONAL_TREE_START, FETCH_PERSONAL_TREE_SUCCESS, FETCH_PERSONAL_TREE_FAIL } from './types/personalTree';

const fetchPersonalTreeStart = makeSyncActionCreator(FETCH_PERSONAL_TREE_START);
const fetchPersonalTreeSuccess = makeSyncActionCreator(FETCH_PERSONAL_TREE_SUCCESS);
const fetchPersonalTreeFail = makeSyncActionCreator(FETCH_PERSONAL_TREE_FAIL);

const getPersonalTree = () => async dispatch => {
  try {
    dispatch(fetchPersonalTreeStart());
    const response = await Axios.get('topics/employee/self');
    const personalTree = response.data;
    dispatch(fetchPersonalTreeSuccess(personalTree.topicRoots));
  } catch (err) {
    dispatch(fetchPersonalTreeFail());
  }
};

export { getPersonalTree };
