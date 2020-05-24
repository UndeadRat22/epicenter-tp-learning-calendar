import { areDatesEqual, fromISOStringToDate } from './dateParser';

const isSelfLearningDay = (date, selfLearningDays) => {
  return selfLearningDays.some(day => areDatesEqual(date, fromISOStringToDate(day.date)));
};

const isTeamLearningDay = (date, teamLearningDays, userId) => {
  return teamLearningDays.some(day => areDatesEqual(date, fromISOStringToDate(day.date)) && day.employeeId === userId);
};

const getSelfLearningDayFromDate = (date, selfLearningDays) => {
  return selfLearningDays.find(day => areDatesEqual(fromISOStringToDate(day.date), date));
};

export { isSelfLearningDay, isTeamLearningDay, getSelfLearningDayFromDate };
