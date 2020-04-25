import { LOADING, LOGGED_IN, LOGGED_OUT } from '../../constants/AuthStatus';
import { BACKEND_API_URL } from '../../constants/URL';
import FeatureToggles from '../../FeatureToggles';

const SET_USER = 'SET_USER';
const FETCH_USER = 'FETCH_USER';

const makeActionCreator = type => {
  return payload => {
    return {
      type,
      payload,
    };
  };
};

const setCurrentUser = makeActionCreator(SET_USER);

const fetchCurrentUser = () => dispatch => {
  // TODO: send login request with test user, get cookies
  if (FeatureToggles.isOn('test-user')) {
    const testUser = {
      email: 'test@test.com',
    };

    dispatch(setCurrentUser({
      user: testUser,
      status: LOGGED_IN,
    }));
  } else {
    // TODO: get token from cookies and get user from backend
    // check bellow commented code
    dispatch(setCurrentUser({
      status: LOGGED_OUT,
    }));
  }

  // fetch(`${BACKEND_API_URL}/api/Authentication/user`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(user => {
  //     dispatch(setCurrentUser({
  //       ...user,
  //       status: LOGGED_IN,
  //     }));
  //   });
};

export {
  setCurrentUser, SET_USER, fetchCurrentUser, FETCH_USER,
};
