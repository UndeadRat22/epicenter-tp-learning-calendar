import makeSyncActionCreator from '../syncActionCreator';
import {
  SHOW_ERROR_TOAST, SHOW_SUCCESS_TOAST, HIDE_SUCCESS_TOAST, HIDE_ERROR_TOAST, SHOW_WARNING_TOAST, HIDE_WARNING_TOAST,
} from './types/toast';

const hideErrorToast = makeSyncActionCreator(HIDE_ERROR_TOAST);
const hideSuccessToast = makeSyncActionCreator(HIDE_SUCCESS_TOAST);
const hideWarningToast = makeSyncActionCreator(HIDE_WARNING_TOAST);

const showErrorToast = makeSyncActionCreator(SHOW_ERROR_TOAST);
const showSuccessToast = makeSyncActionCreator(SHOW_SUCCESS_TOAST);
const showWarningToast = makeSyncActionCreator(SHOW_WARNING_TOAST);

export {
  showErrorToast, showSuccessToast, showWarningToast, hideErrorToast, hideSuccessToast, hideWarningToast,
};
