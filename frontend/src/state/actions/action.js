import Axios from 'axios';
import {
  ACTION_START, ACTION_SUCCESS, ACTION_FAIL,
} from './types/action';

const makeSyncActionCreator = type => {
  return payload => {
    return {
      type,
      payload,
    };
  };
};

const postActionStart = makeSyncActionCreator(ACTION_START);
const postActionSuccess = makeSyncActionCreator(ACTION_SUCCESS);
const postActionFail = makeSyncActionCreator(ACTION_FAIL);

const doPostAction = ({ actionUrl, data }) => async dispatch => {
  try {
    dispatch(postActionStart());
    await Axios.post(actionUrl, data);
    dispatch(postActionSuccess());
  } catch (err) {
    dispatch(postActionFail());
  }
};

export {
  postActionStart, postActionSuccess, postActionFail, doPostAction,
};
