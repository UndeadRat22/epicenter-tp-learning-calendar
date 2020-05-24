/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VISIBLE_SUCCESS_TOAST, VISIBLE_ERROR_TOAST } from './constants/ToastStatus';
import SuccessNotification from './components/SuccessNotification';
import ErrorNotification from './components/ErrorNotification';
import {
  showSuccessToast, showErrorToast, hideSuccessToast, hideErrorToast,
} from './state/actions/toast';

const ToastContainer = () => {
  const { successToastStatus, errorToastStatus, text } = useSelector(state => state.toast);
  const dispatch = useDispatch();

  if (successToastStatus === VISIBLE_SUCCESS_TOAST)
    return (<SuccessNotification text={text} onClose={() => dispatch(hideSuccessToast())} />);

  if (errorToastStatus === VISIBLE_ERROR_TOAST)
    return (<ErrorNotification text={text} onClose={() => dispatch(hideErrorToast())} />);

  return null;
};

const useToast = ({
  successText, errorText, shouldShowSuccessWhen, shouldShowErrorWhen, onSuccess, onError,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldShowSuccessWhen) {
      onSuccess && onSuccess();
      dispatch(showSuccessToast(successText));
    } else if (shouldShowErrorWhen) {
      onError && onError();
      dispatch(showErrorToast(errorText));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowSuccessWhen, shouldShowErrorWhen]);
};

export default ToastContainer;
export { useToast };
