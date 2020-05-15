import {
  LOADING_ALL_TOPICS, FETCH_ALL_TOPICS_FAILED, FETCH_ALL_TOPICS_SUCCEEDED,
} from '../../constants/AllTopicsStatus';
import {
  FETCH_ALL_TOPICS_FAIL, FETCH_ALL_TOPICS_START, FETCH_ALL_TOPICS_SUCCESS,
} from '../actions/types/allTopics';

const initialState = {
  status: '',
  topics: null,
};

const allTopics = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TOPICS_START:
      return {
        status: LOADING_ALL_TOPICS,
        topics: null,
      };
    case FETCH_ALL_TOPICS_FAIL:
      return {
        status: FETCH_ALL_TOPICS_FAILED,
        topics: null,
      };
    case FETCH_ALL_TOPICS_SUCCESS:
      return {
        status: FETCH_ALL_TOPICS_SUCCEEDED,
        topics: action.payload,
      };
    default:
      return state;
  }
};

export default allTopics;
