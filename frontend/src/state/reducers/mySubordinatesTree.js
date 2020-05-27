import {
  LOADING_MY_SUBORDINATES_TREE, FETCH_MY_SUBORDINATES_TREE_SUCCEEDED, FETCH_MY_SUBORDINATES_TREE_FAILED,
} from '../../constants/MySubordinatesTreeStatus';
import {
  FETCH_MY_SUBORDINATES_TREE_START, FETCH_MY_SUBORDINATES_TREE_SUCCESS, FETCH_MY_SUBORDINATES_TREE_FAIL,
} from '../actions/types/mySubordinatesTree';

const initialState = {
  status: '',
  tree: [],
};

const mySubordinatesTree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_SUBORDINATES_TREE_START:
      return {
        ...state,
        status: LOADING_MY_SUBORDINATES_TREE,
      };
    case FETCH_MY_SUBORDINATES_TREE_SUCCESS:
      return {
        status: FETCH_MY_SUBORDINATES_TREE_SUCCEEDED,
        tree: action.payload,
      };
    case FETCH_MY_SUBORDINATES_TREE_FAIL:
      return {
        ...state,
        status: FETCH_MY_SUBORDINATES_TREE_FAILED,
      };
    default:
      return state;
  }
};

export default mySubordinatesTree;
