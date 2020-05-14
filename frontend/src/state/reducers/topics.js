import {
  LOADING_FETCH_TOPICS, FETCH_TOPICS_SUCCEEDED, FETCH_TOPICS_FAILED,
} from '../../constants/FetchTopicsStatus';
import {
  FETCH_TOPICS_START, FETCH_TOPICS_SUCCESS, FETCH_TOPICS_FAIL,
} from '../actions/types';

const initialState = {
  status: LOADING_FETCH_TOPICS,
  topics: [],
};

const topics = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS_START:
      return {
        status: LOADING_FETCH_TOPICS,
        topics: [],
      };
    case FETCH_TOPICS_SUCCESS:
      return {
        status: FETCH_TOPICS_SUCCEEDED,
        topics: action.payload.topics,
      };
    case FETCH_TOPICS_FAIL:
      return {
        status: FETCH_TOPICS_FAILED,
        topics: [],
      };
    default:
      return state;
  }
};

export default topics;
