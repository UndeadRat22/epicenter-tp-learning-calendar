import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_ALL_TOPICS_FAIL, FETCH_ALL_TOPICS_START, FETCH_ALL_TOPICS_SUCCESS } from './types/allTopics';

const fetchAllTopicsStart = makeSyncActionCreator(FETCH_ALL_TOPICS_START);
const fetchAllTopicsSuccess = makeSyncActionCreator(FETCH_ALL_TOPICS_SUCCESS);
const fetchAllTopicsFail = makeSyncActionCreator(FETCH_ALL_TOPICS_FAIL);

const getAllTopics = () => async dispatch => {
  try {
    dispatch(fetchAllTopicsStart());
    const response = await Axios.get('topics');
    const topics = response.data;
    dispatch(fetchAllTopicsSuccess(topics.topics));
  } catch (err) {
    console.log(err.response.data);
    dispatch(fetchAllTopicsFail());
  }
};

export { getAllTopics };
