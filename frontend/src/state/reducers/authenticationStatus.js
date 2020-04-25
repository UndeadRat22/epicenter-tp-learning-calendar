import { SET_AUTHENTICATION_STATUS } from '../actions';

const authenticationStatusReducer = (state = false, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export { authenticationStatusReducer };
