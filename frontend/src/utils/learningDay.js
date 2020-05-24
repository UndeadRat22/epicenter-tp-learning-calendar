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

export { isSelfLearningDay, isTeamLearningDay, getSelfLearningDayFromDate };
