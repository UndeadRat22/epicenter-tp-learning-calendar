import Axios from 'axios';
import {
  FETCH_TOPICS_START, FETCH_TOPICS_SUCCESS, FETCH_TOPICS_FAIL,
} from './types';
import makeSyncActionCreator from '../syncActionCreator';

const fetchTopicsStart = makeSyncActionCreator(FETCH_TOPICS_START);
const fetchTopicsSuccess = makeSyncActionCreator(FETCH_TOPICS_SUCCESS);
const fetchTopicsFail = makeSyncActionCreator(FETCH_TOPICS_FAIL);

const fetchTopics = () => async dispatch => {
  try {
    dispatch(fetchTopicsStart());

    const response = await Axios.get('topics');
    const topics = response.data;

    dispatch(fetchTopicsSuccess(topics));
  } catch (err) {
    dispatch(fetchTopicsFail());
  }
};

export { fetchTopics };
