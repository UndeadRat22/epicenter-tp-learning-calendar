import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  CREATE_TOPIC_FAIL, CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, SUSPEND_CREATE_TOPIC,
} from './types/topic';

const createTopicStart = makeSyncActionCreator(CREATE_TOPIC_START);
const createTopicSuccess = makeSyncActionCreator(CREATE_TOPIC_SUCCESS);
const createTopicFail = makeSyncActionCreator(CREATE_TOPIC_FAIL);
const suspendCreateTopic = makeSyncActionCreator(SUSPEND_CREATE_TOPIC);

// TODO: implement getTopic by id

const createNewTopic = ({ parentTopic, subject, description }) => async dispatch => {
  try {
    dispatch(createTopicStart());
    await Axios.post('topics/topic', { parentTopic, subject, description });
    dispatch(createTopicSuccess());
  } catch (err) {
    console.log(err);
    dispatch(createTopicFail());
  }
};

export { createNewTopic, suspendCreateTopic };
