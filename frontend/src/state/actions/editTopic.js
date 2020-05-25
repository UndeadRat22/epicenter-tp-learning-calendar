import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  EDIT_TOPIC_START, EDIT_TOPIC_SUCCESS, EDIT_TOPIC_FAIL, SUSPEND_EDIT_TOPIC,
} from './types/editTopic';
import { showSuccessToast, showErrorToast } from './toast';
import { getAllTopics } from './allTopics';

const editTopicStart = makeSyncActionCreator(EDIT_TOPIC_START);
const editTopicSuccess = makeSyncActionCreator(EDIT_TOPIC_SUCCESS);
const editTopicFail = makeSyncActionCreator(EDIT_TOPIC_FAIL);
const suspendEditTopic = makeSyncActionCreator(SUSPEND_EDIT_TOPIC);

const editTopic = (oldTopic, newTopic) => async dispatch => {
  try {
    dispatch(editTopicStart());
    await Axios.put('topics/topic', { oldTopic, newTopic });

    dispatch(editTopicSuccess());
    dispatch(showSuccessToast('Topic edited'));
    dispatch(getAllTopics());
  } catch (err) {
    // TODO: optimistic locking
    // dispatch status === optimistic_lock
    // if (err.response.status === 409) {

    // }
    dispatch(showErrorToast('Failed to edit topic'));
    console.log(err);
    dispatch(editTopicFail());
  } finally {
    dispatch(suspendEditTopic());
  }
};

export { editTopic, suspendEditTopic };
