import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';
import register from './register';
import changePassword from './changePassword';
import topicsTree from './topicsTree';
import topic from './topic';
import allTopics from './allTopics';
import myTeam from './myTeam';
import personalGoals from './personalGoals';

export default combineReducers({
  auth, invite, register, changePassword, topicsTree, topic, allTopics, myTeam, personalGoals,
});
