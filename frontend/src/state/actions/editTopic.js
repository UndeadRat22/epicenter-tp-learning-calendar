import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  EDIT_TOPIC_START, EDIT_TOPIC_SUCCESS, EDIT_TOPIC_FAIL, SUSPEND_EDIT_TOPIC, OPTIMISTIC_LOCK,
} from './types/editTopic';
import { showSuccessToast, showErrorToast } from './toast';
import { getAllTopics } from './allTopics';

const editTopicStart = makeSyncActionCreator(EDIT_TOPIC_START);
const editTopicSuccess = makeSyncActionCreator(EDIT_TOPIC_SUCCESS);
const editTopicFail = makeSyncActionCreator(EDIT_TOPIC_FAIL);
const suspendEditTopic = makeSyncActionCreator(SUSPEND_EDIT_TOPIC);
const optimisticLockExc = makeSyncActionCreator(OPTIMISTIC_LOCK);

const editTopic = (oldTopic, newTopic) => async dispatch => {
  const mockErrorResponse = {
    response: {
      data: 'emulate-backend-off toggle is on',
      status: 409,
    },
  };
  try {
    dispatch(editTopicStart());
    // await Axios.put('topics/topic', { oldTopic, newTopic });
    await new Promise((resolve, reject) => setTimeout(() => reject(mockErrorResponse), 1000));
    dispatch(editTopicSuccess());
    dispatch(showSuccessToast('Topic edited'));
    dispatch(getAllTopics());
  } catch (err) {
    if (err.response.status === 409)
      dispatch(optimisticLockExc());
    else {
      dispatch(showErrorToast('Failed to edit topic'));
      console.log(err.response);
      dispatch(editTopicFail());
    }
  } finally {
    dispatch(suspendEditTopic());
  }
};

export { editTopic, suspendEditTopic };
