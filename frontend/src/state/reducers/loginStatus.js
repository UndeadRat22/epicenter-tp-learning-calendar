import { SET_LOGINSTATUS } from '../actions';

export const loginStatusReducer = (state = [], action) => {
  switch (action.type) {
    case SET_LOGINSTATUS:
      return action.payload;
    default:
      return state;
  }
};
