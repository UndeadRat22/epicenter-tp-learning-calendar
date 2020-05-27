import {
  LOADING_PERSONAL_TREE, FETCH_PERSONAL_TREE_SUCCEEDED, FETCH_PERSONAL_TREE_FAILED,
} from '../../constants/PersonalTreeStatus';
import {
  FETCH_PERSONAL_TREE_START, FETCH_PERSONAL_TREE_SUCCESS, FETCH_PERSONAL_TREE_FAIL,
} from '../actions/types/personalTree';

const initialState = {
  status: '',
  tree: [],
};

const personalTree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_TREE_START:
      return {
        ...state,
        status: LOADING_PERSONAL_TREE,
      };
    case FETCH_PERSONAL_TREE_SUCCESS:
      return {
        status: FETCH_PERSONAL_TREE_SUCCEEDED,
        tree: action.payload,
      };
    case FETCH_PERSONAL_TREE_FAIL:
      return {
        ...state,
        status: FETCH_PERSONAL_TREE_FAILED,
      };
    default:
      return state;
  }
};

export default personalTree;
