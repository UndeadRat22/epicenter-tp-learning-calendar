import { SET_USER } from '../actions';
import { LOGGED_OUT, LOGGED_IN, LOADING } from '../../constants/AuthStatus';

const initialState = {
  status: LOADING,
  user: {},
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export { currentUser };
