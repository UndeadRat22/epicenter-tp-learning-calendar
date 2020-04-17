export const SET_LOGINSTATUS = 'SET_LOGINSTATUS';

const makeActionCreator = type => {
  return function(payload) {
    return {
      type,
      payload,
    };
  };
};

export const setLoginStatus = makeActionCreator(SET_LOGINSTATUS);
