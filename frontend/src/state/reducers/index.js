import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';
import register from './register';
import changePassword from './changePassword';
import topicsTree from './topicsTree';
import topic from './topic';
import allTopics from './allTopics';
import personalGoals from './personalGoals';
import limits from './limits';

export default combineReducers({
  auth, invite, register, changePassword, topicsTree, topic, allTopics, personalGoals, limits,
});
