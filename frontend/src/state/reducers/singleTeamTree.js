import {
  LOADING_SINGLE_TEAM_TREE, FETCH_SINGLE_TEAM_TREE_SUCCEEDED, FETCH_SINGLE_TEAM_TREE_FAILED,
} from '../../constants/SingleTeamTreeStatus';
import {
  FETCH_SINGLE_TEAM_TREE_START, FETCH_SINGLE_TEAM_TREE_SUCCESS, FETCH_SINGLE_TEAM_TREE_FAIL,
} from '../actions/types/singleTeamTree';

const initialState = {
  status: '',
  tree: [],
};

const singleTeamTree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_TEAM_TREE_START:
      return {
        ...state,
        status: LOADING_SINGLE_TEAM_TREE,
      };
    case FETCH_SINGLE_TEAM_TREE_SUCCESS:
      return {
        status: FETCH_SINGLE_TEAM_TREE_SUCCEEDED,
        tree: action.payload,
      };
    case FETCH_SINGLE_TEAM_TREE_FAIL:
      return {
        ...state,
        status: FETCH_SINGLE_TEAM_TREE_FAILED,
      };
    default:
      return state;
  }
};

export default singleTeamTree;
