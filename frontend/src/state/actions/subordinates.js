import Axios from 'axios';
import makeSyncActionCreator from '../syncActionCreator';
import {
  FETCH_SUBORDINATES_START, FETCH_SUBORDINATES_SUCCESS, FETCH_SUBORDINATES_FAIL,
  UPDATE_SUBORDINATE_START, UPDATE_SUBORDINATE_SUCCESS, UPDATE_SUBORDINATE_FAIL, UPDATE_SUBORDINATE_SUSPEND,
  DELETE_SUBORDINATE_START, DELETE_SUBORDINATE_SUCCESS, DELETE_SUBORDINATE_FAIL, DELETE_SUBORDINATE_SUSPEND,
} from './types/subordinates';
import { getMyTeam } from './myTeam';
import { showSuccessToast, showErrorToast } from './toast';

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

const updateSubordinateStart = makeSyncActionCreator(UPDATE_SUBORDINATE_START);
const updateSubordinateSuccess = makeSyncActionCreator(UPDATE_SUBORDINATE_SUCCESS);
const updateSubordinateFail = makeSyncActionCreator(UPDATE_SUBORDINATE_FAIL);
const updateSubordinateSuspend = makeSyncActionCreator(UPDATE_SUBORDINATE_SUSPEND);

const updateSubordinate = ({ employeeId, managerId }) => async dispatch => {
  try {
    dispatch(updateSubordinateStart());

    await Axios.put('employees/employee/team', { employeeId, managerId });

    dispatch(updateSubordinateSuccess());
    dispatch(showSuccessToast('Employee has been reassigned to another team'));
    dispatch(getSubordinates());
    dispatch(getMyTeam());
  } catch (err) {
    dispatch(updateSubordinateFail());
    dispatch(showErrorToast('Failed to reassign employee'));
  } finally {
    dispatch(updateSubordinateSuspend());
  }
};

const deleteSubordinateStart = makeSyncActionCreator(DELETE_SUBORDINATE_START);
const deleteSubordinateSuccess = makeSyncActionCreator(DELETE_SUBORDINATE_SUCCESS);
const deleteSubordinateFail = makeSyncActionCreator(DELETE_SUBORDINATE_FAIL);
const deleteSubordinateSuspend = makeSyncActionCreator(DELETE_SUBORDINATE_SUSPEND);

const deleteSubordinate = ({ employeeId }) => async dispatch => {
  try {
    dispatch(deleteSubordinateStart());

    await Axios.delete(`employees/employee/${employeeId}`);

    dispatch(deleteSubordinateSuccess());
    dispatch(showSuccessToast('Employee has been deleted'));
    dispatch(getSubordinates());
    dispatch(getMyTeam());
  } catch (err) {
    dispatch(deleteSubordinateFail());
    dispatch(showErrorToast('Failed to delete employee'));
  } finally {
    dispatch(deleteSubordinateSuspend());
  }
};

export {
  getSubordinates, updateSubordinate, updateSubordinateSuspend, deleteSubordinate, deleteSubordinateSuspend,
};
