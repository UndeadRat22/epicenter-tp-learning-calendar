import {
  LOADING_MY_TEAM_TREE, FETCH_MY_TEAM_TREE_SUCCEEDED, FETCH_MY_TEAM_TREE_FAILED, FETCH_MY_TEAM_TREE_INACTIVE,
} from '../../constants/MyTeamTreeStatus';
import {
  FETCH_MY_TEAM_TREE_START, FETCH_MY_TEAM_TREE_SUCCESS, FETCH_MY_TEAM_TREE_FAIL, SUSPEND_MY_TEAM_TREE,
} from '../actions/types/myTeamTree';

const initialState = {
  status: '',
  tree: [],
};

const myTeamTree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_TEAM_TREE_START:
      return {
        ...state,
        status: LOADING_MY_TEAM_TREE,
      };
    case FETCH_MY_TEAM_TREE_SUCCESS:
      return {
        status: FETCH_MY_TEAM_TREE_SUCCEEDED,
        tree: action.payload,
      };
    case FETCH_MY_TEAM_TREE_FAIL:
      return {
        ...state,
        status: FETCH_MY_TEAM_TREE_FAILED,
      };
    case SUSPEND_MY_TEAM_TREE:
      return {
        ...state,
        status: FETCH_MY_TEAM_TREE_INACTIVE,
      };
    default:
      return state;
  }
};

export default myTeamTree;
