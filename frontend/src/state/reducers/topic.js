import {
  LOADING_CREATE_TOPIC, CREATE_TOPIC_FAILED, CREATE_TOPIC_SUCCEEDED, CREATE_TOPIC_INACTIVE,
} from '../../constants/TopicStatus';
import {
  CREATE_TOPIC_FAIL, CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, SUSPEND_CREATE_TOPIC,
} from '../actions/types/topic';

const initialState = {
  status: CREATE_TOPIC_INACTIVE,
};

const topic = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TOPIC_START:
      return {
        status: LOADING_CREATE_TOPIC,
      };
    case CREATE_TOPIC_SUCCESS:
      return {
        status: CREATE_TOPIC_SUCCEEDED,
      };
    case CREATE_TOPIC_FAIL:
      return {
        status: CREATE_TOPIC_FAILED,
      };
    case SUSPEND_CREATE_TOPIC:
      return {
        status: CREATE_TOPIC_INACTIVE,
      };
    default:
      return state;
  }
};

export default topic;
