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

const actionStart = makeSyncActionCreator(ACTION_START);
const actionSuccess = makeSyncActionCreator(ACTION_SUCCESS);
const actionFail = makeSyncActionCreator(ACTION_FAIL);

const post = ({ actionUrl, data }) => async dispatch => {
  try {
    dispatch(actionStart());
    await Axios.post(actionUrl, data);
    dispatch(actionSuccess());
  } catch (err) {
    dispatch(actionFail());
  }
};

export {
  actionStart, actionSuccess, actionFail, post,
};
