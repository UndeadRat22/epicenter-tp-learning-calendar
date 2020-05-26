import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_TOPICS_TREE_FAIL, FETCH_TOPICS_TREE_START, FETCH_TOPICS_TREE_SUCCESS } from './types/topicsTree';

const fetchTopicsTreeStart = makeSyncActionCreator(FETCH_TOPICS_TREE_START);
const fetchTopicsTreeSuccess = makeSyncActionCreator(FETCH_TOPICS_TREE_SUCCESS);
const fetchTopicsTreeFail = makeSyncActionCreator(FETCH_TOPICS_TREE_FAIL);

const getTopicsTree = () => async dispatch => {
  try {
    dispatch(fetchTopicsTreeStart());
    const response = await Axios.get('topics/tree');
    const topics = response.data;
    dispatch(fetchTopicsTreeSuccess(topics));
  } catch (err) {
    console.log(err.response.data);
    dispatch(fetchTopicsTreeFail());
  }
};

export { getTopicsTree };
