import makeSyncActionCreator from '../syncActionCreator';
import {
  SHOW_ERROR_TOAST, SHOW_SUCCESS_TOAST, HIDE_SUCCESS_TOAST, HIDE_ERROR_TOAST,
} from './types/toast';

const hideErrorToast = makeSyncActionCreator(HIDE_ERROR_TOAST);
const hideSuccessToast = makeSyncActionCreator(HIDE_SUCCESS_TOAST);

const showErrorToast = makeSyncActionCreator(SHOW_ERROR_TOAST);
const showSuccessToast = makeSyncActionCreator(SHOW_SUCCESS_TOAST);

export {
  showErrorToast, showSuccessToast, hideErrorToast, hideSuccessToast,
};
