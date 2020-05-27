import { areDatesEqual, fromISOStringToDate } from './dateParser';

const isSelfLearningDay = (date, selfLearningDays) => {
  return selfLearningDays.some(day => areDatesEqual(date, fromISOStringToDate(day.date)));
};

const isTeamLearningDay = (date, teamLearningDays) => {
  return teamLearningDays.some(day => areDatesEqual(date, fromISOStringToDate(day.date)));
};

const getSelfLearningDayFromDate = (date, selfLearningDays) => {
  return selfLearningDays.find(day => areDatesEqual(fromISOStringToDate(day.date), date));
};

const getTeamMemberLearningDayFromDate = ({ date, employee, teamLearningDays }) => {
  return teamLearningDays.find(day => areDatesEqual(fromISOStringToDate(day.date), date) && day.employee.id === employee.id);
};

export {
  isSelfLearningDay, isTeamLearningDay, getSelfLearningDayFromDate, getTeamMemberLearningDayFromDate,
};
