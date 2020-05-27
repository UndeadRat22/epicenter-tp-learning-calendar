import { combineReducers } from 'redux';
import auth from './auth';
import invite from './invite';
import register from './register';
import changePassword from './changePassword';
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
import personalTree from './personalTree';
import myTeamTree from './myTeamTree';
import mySubordinatesTree from './mySubordinatesTree';
import singleSubordinateTree from './singleSubordinateTree';
import singleTeamTree from './singleTeamTree';

export default combineReducers({
  auth,
  invite,
  register,
  changePassword,
  topic,
  allTopics,
  personalGoals,
  limits,
  learningDays,
  toast,
  myTeam,
  assignGoals,
  editTopic,
  subordinates,
  personalTree,
  myTeamTree,
  mySubordinatesTree,
  singleSubordinateTree,
  singleTeamTree,
});
