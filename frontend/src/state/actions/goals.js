import {
  ASSIGN_GOAL,
} from './types/goals';

const makeSyncActionCreator = type => {
  return payload => {
    return {
      type,
      payload,
    };
  };
};

const assignGoal = makeSyncActionCreator(ASSIGN_GOAL);

export {
  assignGoal,
};
