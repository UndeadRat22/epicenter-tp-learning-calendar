import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  CREATE_TOPIC_FAIL, CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, SUSPEND_CREATE_TOPIC, FETCH_TOPIC_FAIL, FETCH_TOPIC_SUCCESS, FETCH_TOPIC_START,
  FETCH_LEARNED_TOPICS_FAIL, FETCH_LEARNED_TOPICS_START, FETCH_LEARNED_TOPICS_SUCCESS, SUSPEND_FETCH_LEARNED_TOPICS,
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

const getLearnedTopicsStart = makeSyncActionCreator(FETCH_LEARNED_TOPICS_START);
const getLearnedTopicsSuccess = makeSyncActionCreator(FETCH_LEARNED_TOPICS_SUCCESS);
const getLearnedTopicsFail = makeSyncActionCreator(FETCH_LEARNED_TOPICS_FAIL);
const suspendGetLearnedTopics = makeSyncActionCreator(SUSPEND_FETCH_LEARNED_TOPICS);


const getTopic = topicId => async dispatch => {
  try {
    dispatch(getTopicStart());
    const response = await Axios.get('topics/topic/'.concat(topicId));
    const topic = response.data;
    dispatch(getTopicSuccess(topic));
  } catch (err) {
    console.log(err.response);
    dispatch(getTopicFail());
  }
};

const createNewTopic = ({ parentTopic, subject, description }) => async dispatch => {
  try {
    dispatch(createTopicStart());

    const nullableParentTopic = parentTopic === '' ? null : parentTopic;
    await Axios.post('topics/topic', { parentTopic: nullableParentTopic, subject, description });

    dispatch(createTopicSuccess());
    dispatch(showSuccessToast('Topic created'));
    dispatch(getAllTopics());
  } catch (err) {
    dispatch(showErrorToast('Failed creating a topic'));
    console.log(err.response);
    dispatch(createTopicFail());
  } finally {
    dispatch(suspendCreateTopic());
  }
};

const getLearnedTopics = () => async dispatch => {
  try {
    dispatch(getLearnedTopicsStart());

    const response = await Axios.get('topics/learned/self');

    const learnedTopics = response.data.topics;

    dispatch(getLearnedTopicsSuccess(learnedTopics));
  } catch (err) {
    dispatch(showErrorToast('Failed getting learned topics'));
    console.log(err.response);
    dispatch(getLearnedTopicsFail());
  } finally {
    dispatch(suspendGetLearnedTopics());
  }
};

export {
  createNewTopic, suspendCreateTopic, getTopic, getLearnedTopics,
};
