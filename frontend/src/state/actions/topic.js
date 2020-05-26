import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  CREATE_TOPIC_FAIL, CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, SUSPEND_CREATE_TOPIC, FETCH_TOPIC_FAIL, FETCH_TOPIC_SUCCESS, FETCH_TOPIC_START,
} from './types/topic';
import { showSuccessToast, showErrorToast } from './toast';
import { getAllTopics } from './allTopics';

const createTopicStart = makeSyncActionCreator(CREATE_TOPIC_START);
const createTopicSuccess = makeSyncActionCreator(CREATE_TOPIC_SUCCESS);
const createTopicFail = makeSyncActionCreator(CREATE_TOPIC_FAIL);
const suspendCreateTopic = makeSyncActionCreator(SUSPEND_CREATE_TOPIC);

const getTopicStart = makeSyncActionCreator(FETCH_TOPIC_START);
const getTopicSuccess = makeSyncActionCreator(FETCH_TOPIC_SUCCESS);
const getTopicFail = makeSyncActionCreator(FETCH_TOPIC_FAIL);


const getTopic = topicId => async dispatch => {
  try {
    dispatch(getTopicStart());
    const response = await Axios.get('topics/topic/'.concat(topicId));
    const topic = response.data;
    dispatch(getTopicSuccess(topic));
  } catch (err) {
    console.log(err.response.data);
    dispatch(getTopicFail());
  }
};

const createNewTopic = ({ parentTopic, subject, description }) => async dispatch => {
  try {
    dispatch(createTopicStart());

    console.log({ parentTopic, subject, description });
    const nullableParentTopic = parentTopic === '' ? null : parentTopic;
    await Axios.post('topics/topic', { parentTopic: nullableParentTopic, subject, description });

    dispatch(createTopicSuccess());
    dispatch(showSuccessToast('Topic created'));
    dispatch(getAllTopics());
  } catch (err) {
    dispatch(showErrorToast('Failed creating a topic'));
    console.log(err.response.data);
    dispatch(createTopicFail());
  } finally {
    dispatch(suspendCreateTopic());
  }
};

export { createNewTopic, suspendCreateTopic, getTopic };
