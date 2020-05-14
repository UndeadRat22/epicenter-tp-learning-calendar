import {
  LOADING_TOPICS_TREE, FETCH_TOPICS_TREE_FAILED, FETCH_TOPICS_TREE_SUCCEEDED,
} from '../../constants/TopicsTreeStatus';
import {
  FETCH_TOPICS_TREE_FAIL, FETCH_TOPICS_TREE_START, FETCH_TOPICS_TREE_SUCCESS,
} from '../actions/types/topicsTree';

const initialState = {
  status: '',
  topicsTree: null,
};

const getTopicsTree = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS_TREE_START:
      return {
        status: LOADING_TOPICS_TREE,
        topicsTree: null,
      };
    case FETCH_TOPICS_TREE_FAIL:
      return {
        status: FETCH_TOPICS_TREE_FAILED,
        topicsTree: null,
      };
    case FETCH_TOPICS_TREE_SUCCESS:
      return {
        status: FETCH_TOPICS_TREE_SUCCEEDED,
        topicsTree: action.payload,
      };
    default:
      return state;
  }
};

export default getTopicsTree;
