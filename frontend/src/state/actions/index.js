const SET_AUTHENTICATION_STATUS = 'SET_AUTHENTICATION_STATUS';
const SET_USER = 'SER_USER';

const makeActionCreator = type => {
  return payload => {
    return {
      type,
      payload,
    };
  };
};

const setAuthenticationStatus = makeActionCreator(SET_AUTHENTICATION_STATUS);
const setUser = makeActionCreator(SET_USER);

export {
  SET_AUTHENTICATION_STATUS, SET_USER, setAuthenticationStatus, setUser,
};
