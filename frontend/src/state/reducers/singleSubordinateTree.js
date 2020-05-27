import {
  LOADING_SINGLE_SUBORDINATE_TREE, FETCH_SINGLE_SUBORDINATE_TREE_SUCCEEDED, FETCH_SINGLE_SUBORDINATE_TREE_FAILED,
} from '../../constants/SingleSubordinateTreeStatus';
import {
  FETCH_SINGLE_SUBORDINATE_TREE_START, FETCH_SINGLE_SUBORDINATE_TREE_SUCCESS, FETCH_SINGLE_SUBORDINATE_TREE_FAIL,
} from '../actions/types/singleSubordinateTree';

const initialState = {
  status: '',
  tree: [],
};

const singleSubordinateTree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_SUBORDINATE_TREE_START:
      return {
        ...state,
        status: LOADING_SINGLE_SUBORDINATE_TREE,
      };
    case FETCH_SINGLE_SUBORDINATE_TREE_SUCCESS:
      return {
        status: FETCH_SINGLE_SUBORDINATE_TREE_SUCCEEDED,
        tree: action.payload,
      };
    case FETCH_SINGLE_SUBORDINATE_TREE_FAIL:
      return {
        ...state,
        status: FETCH_SINGLE_SUBORDINATE_TREE_FAILED,
      };
    default:
      return state;
  }
};

export default singleSubordinateTree;
