const makeSyncActionCreator = type => {
  return payload => {
    return {
      type,
      payload,
    };
  };
};

export default makeSyncActionCreator;
