import {
  LOADING_CREATE_TOPIC, CREATE_TOPIC_FAILED, CREATE_TOPIC_SUCCEEDED, CREATE_TOPIC_INACTIVE, LOADING_FETCH_TOPIC, FETCH_TOPIC_FAILED, FETCH_TOPIC_SUCCEEDED, FETCH_LEARNED_TOPICS_INACTIVE, FETCH_LEARNED_TOPICS_SUCCEEDED, LOADING_FETCH_LEARNED_TOPICS, FETCH_LEARNED_TOPICS_FAILED,
} from '../../constants/TopicStatus';
import {
  CREATE_TOPIC_FAIL, CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, SUSPEND_CREATE_TOPIC, FETCH_TOPIC_FAIL, FETCH_TOPIC_START, FETCH_TOPIC_SUCCESS, FETCH_LEARNED_TOPICS_START,
} from '../actions/types/topic';

const initialState = {
  status: CREATE_TOPIC_INACTIVE,
  learnedTopicsStatus: FETCH_LEARNED_TOPICS_INACTIVE,
  learnedTopics: [],
  topic: {},
};

const topic = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TOPIC_START:
      return {
        ...state,
        status: LOADING_CREATE_TOPIC,
        topic: {},
      };
    case CREATE_TOPIC_SUCCESS:
      return {
        ...state,
        status: CREATE_TOPIC_SUCCEEDED,
        topic: {},
      };
    case CREATE_TOPIC_FAIL:
      return {
        ...state,
        status: CREATE_TOPIC_FAILED,
        topic: {},
      };
    case SUSPEND_CREATE_TOPIC:
      return {
        ...state,
        status: CREATE_TOPIC_INACTIVE,
        topic: {},
      };
    case FETCH_TOPIC_START:
      return {
        ...state,
        status: LOADING_FETCH_TOPIC,
        topic: {},
      };
    case FETCH_TOPIC_SUCCESS:
      return {
        ...state,
        status: FETCH_TOPIC_SUCCEEDED,
        topic: action.payload,
      };
    case FETCH_TOPIC_FAIL:
      return {
        ...state,
        status: FETCH_TOPIC_FAILED,
        topic: {},
      };
    case FETCH_LEARNED_TOPICS_START:
      return {
        ...state,
        learnedTopicsStatus: LOADING_FETCH_LEARNED_TOPICS,
      };
    case FETCH_LEARNED_TOPICS_SUCCEEDED:
      return {
        ...state,
        learnedTopicsStatus: FETCH_LEARNED_TOPICS_SUCCEEDED,
        learnedTopics: action.payload,
      };
    case FETCH_LEARNED_TOPICS_FAILED:
      return {
        ...state,
        learnedTopicsStatus: FETCH_LEARNED_TOPICS_FAILED,
      };
    case FETCH_LEARNED_TOPICS_INACTIVE:
      return {
        ...state,
        learnedTopicsStatus: FETCH_LEARNED_TOPICS_INACTIVE,
      };
    default:
      return state;
  }
};

export default topic;
