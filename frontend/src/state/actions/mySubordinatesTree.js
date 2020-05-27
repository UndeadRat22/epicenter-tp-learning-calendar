import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_MY_SUBORDINATES_TREE_START, FETCH_MY_SUBORDINATES_TREE_SUCCESS, FETCH_MY_SUBORDINATES_TREE_FAIL } from './types/mySubordinatesTree';

const fetchMySubordinatesTreeStart = makeSyncActionCreator(FETCH_MY_SUBORDINATES_TREE_START);
const fetchMySubordinatesTreeSuccess = makeSyncActionCreator(FETCH_MY_SUBORDINATES_TREE_SUCCESS);
const fetchMySubordinatesTreeFail = makeSyncActionCreator(FETCH_MY_SUBORDINATES_TREE_FAIL);

const getMySubordinatesTree = () => async dispatch => {
  try {
    dispatch(fetchMySubordinatesTreeStart());
    const response = await Axios.get('');
    const mySubordinatesTree = response.data;
    dispatch(fetchMySubordinatesTreeSuccess(mySubordinatesTree));
  } catch (err) {
    dispatch(fetchMySubordinatesTreeFail());
  }
};

export { getMySubordinatesTree };
