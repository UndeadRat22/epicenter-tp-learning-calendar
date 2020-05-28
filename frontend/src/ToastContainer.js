/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VISIBLE_SUCCESS_TOAST, VISIBLE_ERROR_TOAST, VISIBLE_WARNING_TOAST } from './constants/ToastStatus';
import SuccessNotification from './components/SuccessNotification';
import ErrorNotification from './components/ErrorNotification';
import WarningNotification from './components/WarningNotification';
import {
  showSuccessToast, showErrorToast, showWarningToast, hideSuccessToast, hideErrorToast, hideWarningToast,
} from './state/actions/toast';

const ToastContainer = () => {
  const {
    successToastStatus, errorToastStatus, warningToastStatus, text,
  } = useSelector(state => state.toast);

  const dispatch = useDispatch();

  if (successToastStatus === VISIBLE_SUCCESS_TOAST)
    return (<SuccessNotification text={text} onClose={() => dispatch(hideSuccessToast())} />);

  if (errorToastStatus === VISIBLE_ERROR_TOAST)
    return (<ErrorNotification text={text} onClose={() => dispatch(hideErrorToast())} />);

  if (warningToastStatus === VISIBLE_WARNING_TOAST)
    return (<WarningNotification text={text} onClose={() => dispatch(hideWarningToast())} />);

  return null;
};

const useToast = ({
  successText, errorText, warningText, shouldShowSuccessWhen, shouldShowErrorWhen, shouldShowWarningWhen, onSuccess, onError, onWarning,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldShowSuccessWhen) {
      onSuccess && onSuccess();
      dispatch(showSuccessToast(successText));
    } else if (shouldShowErrorWhen) {
      onError && onError();
      dispatch(showErrorToast(errorText));
    } else if (shouldShowWarningWhen) {
      onWarning && onWarning();
      dispatch(showWarningToast(warningText));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowSuccessWhen, shouldShowErrorWhen, shouldShowWarningWhen]);
};

export default ToastContainer;
export { useToast };
