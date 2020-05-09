import {
  ASSIGN_GOAL,
} from '../actions/types/goals';

import InitialData from './InitialData';

const initialState = InitialData.employees;

const employees = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_GOAL: {
      const { employeeId, topic } = action.payload;
      const employee = state.find(e => e.id === employeeId);
      employee.goalTopics.push(topic);
      return state;
    }
    default:
      return state;
  }
};

export default employees;
