const SET_LOGINSTATUS = 'SET_LOGINSTATUS';

const makeActionCreator = type => {
  return payload => {
    return {
      type,
      payload,
    };
  };
};

const setLoginStatus = makeActionCreator(SET_LOGINSTATUS);

export { SET_LOGINSTATUS, setLoginStatus };
