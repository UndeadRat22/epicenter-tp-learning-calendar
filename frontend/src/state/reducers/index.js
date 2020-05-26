import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';
import register from './register';
import changePassword from './changePassword';
import topicsTree from './topicsTree';
import topic from './topic';
import allTopics from './allTopics';
import editTopic from './editTopic';
import personalGoals from './personalGoals';
import limits from './limits';
import learningDays from './learningDays';
import toast from './toast';
import myTeam from './myTeam';
import assignGoals from './assignGoals';
import subordinates from './subordinates';

export default combineReducers({
  auth, invite, register, changePassword, topicsTree, topic, allTopics, personalGoals, limits, learningDays, toast, myTeam, assignGoals, editTopic, subordinates,
});
