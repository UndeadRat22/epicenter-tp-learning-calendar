import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  EDIT_TOPIC_START, EDIT_TOPIC_SUCCESS, EDIT_TOPIC_FAIL, SUSPEND_EDIT_TOPIC,
} from './types/editTopic';

const editTopicStart = makeSyncActionCreator(EDIT_TOPIC_START);
const editTopicSuccess = makeSyncActionCreator(EDIT_TOPIC_SUCCESS);
const editTopicFail = makeSyncActionCreator(EDIT_TOPIC_FAIL);
const suspendEditTopic = makeSyncActionCreator(SUSPEND_EDIT_TOPIC);

const editTopic = ({
  parentTopicId, topicId, subject, description,
}) => async dispatch => {
  try {
    dispatch(editTopicStart());
    await Axios.put('topics/topic', {
      parentTopicId, topicId, subject, description,
    });
    dispatch(editTopicSuccess());
  } catch (err) {
    console.log(err);
    dispatch(editTopicFail());
  }
};

export { editTopic, suspendEditTopic };
