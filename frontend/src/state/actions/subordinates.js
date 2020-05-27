import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import { FETCH_SUBORDINATES_START, FETCH_SUBORDINATES_SUCCESS, FETCH_SUBORDINATES_FAIL } from './types/subordinates';

const fetchSubordinatesStart = makeSyncActionCreator(FETCH_SUBORDINATES_START);
const fetchSubordinatesSuccess = makeSyncActionCreator(FETCH_SUBORDINATES_SUCCESS);
const fetchSubordinatesFail = makeSyncActionCreator(FETCH_SUBORDINATES_FAIL);

const getSubordinates = () => async dispatch => {
  try {
    dispatch(fetchSubordinatesStart());
    const response = await Axios.get('employees/subordinates');
    const subordinates = response.data;
    dispatch(fetchSubordinatesSuccess(subordinates));
  } catch (err) {
    dispatch(fetchSubordinatesFail());
  }
};

export { getSubordinates };
