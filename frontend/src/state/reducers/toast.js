import {
  HIDDEN_SUCCESS_TOAST, HIDDEN_ERROR_TOAST, VISIBLE_SUCCESS_TOAST, VISIBLE_ERROR_TOAST,
} from '../../constants/ToastStatus';
import {
  SHOW_SUCCESS_TOAST, HIDE_SUCCESS_TOAST, SHOW_ERROR_TOAST, HIDE_ERROR_TOAST,
} from '../actions/types/toast';

const initialState = {
  successToastStatus: HIDDEN_SUCCESS_TOAST,
  errorToastStatus: HIDDEN_ERROR_TOAST,
  text: '',
};

const toast = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SUCCESS_TOAST:
      return {
        successToastStatus: VISIBLE_SUCCESS_TOAST,
        errorToastStatus: HIDDEN_ERROR_TOAST,
        text: action.payload,
      };
    case HIDE_SUCCESS_TOAST:
      return {
        errorToastStatus: HIDDEN_ERROR_TOAST,
        successToastStatus: HIDDEN_SUCCESS_TOAST,
        text: '',
      };
    case SHOW_ERROR_TOAST:
      return {
        errorToastStatus: VISIBLE_ERROR_TOAST,
        successToastStatus: HIDDEN_SUCCESS_TOAST,
        text: action.payload,
      };
    case HIDE_ERROR_TOAST:
      return {
        errorToastStatus: HIDDEN_ERROR_TOAST,
        successToastStatus: HIDDEN_SUCCESS_TOAST,
        text: '',
      };
    default:
      return state;
  }
};

export default toast;
