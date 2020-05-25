import {
  LOADING_CREATE_TOPIC, CREATE_TOPIC_FAILED, CREATE_TOPIC_SUCCEEDED, CREATE_TOPIC_INACTIVE, LOADING_FETCH_TOPIC, FETCH_TOPIC_FAILED, FETCH_TOPIC_SUCCEEDED,
} from '../../constants/TopicStatus';
import {
  CREATE_TOPIC_FAIL, CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, SUSPEND_CREATE_TOPIC, FETCH_TOPIC_FAIL, FETCH_TOPIC_START, FETCH_TOPIC_SUCCESS,
} from '../actions/types/topic';

const initialState = {
  status: CREATE_TOPIC_INACTIVE,
  topic: {},
};

const topic = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TOPIC_START:
      return {
        status: LOADING_CREATE_TOPIC,
        topic: {},
      };
    case CREATE_TOPIC_SUCCESS:
      return {
        status: CREATE_TOPIC_SUCCEEDED,
        topic: {},
      };
    case CREATE_TOPIC_FAIL:
      return {
        status: CREATE_TOPIC_FAILED,
        topic: {},
      };
    case SUSPEND_CREATE_TOPIC:
      return {
        status: CREATE_TOPIC_INACTIVE,
        topic: {},
      };
    case FETCH_TOPIC_START:
      return {
        status: LOADING_FETCH_TOPIC,
        topic: {},
      };
    case FETCH_TOPIC_SUCCESS:
      return {
        status: FETCH_TOPIC_SUCCEEDED,
        topic: action.payload,
      };
    case FETCH_TOPIC_FAIL:
      return {
        status: FETCH_TOPIC_FAILED,
        topic: {},
      };
    default:
      return state;
  }
};

export default topic;
