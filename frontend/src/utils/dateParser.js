import moment from 'moment';

// input: Fri May 08 2020 00:00:00 GMT+0300 (Eastern European Summer Time)
// output: 2020-05-08
const getOnlyLocalDate = date => {
  return moment(date).toISOString(true).slice(0, 10);
};

// input: Fri May 08 2020 00:00:00 GMT+0300 (Eastern European Summer Time)
// output: 2020-05-08T00:00:00.000Z
const getLocalIsoString = date => {
  return new Date(moment(date).toISOString(true).slice(0, 10)).toISOString();
};

// input: Fri May 08 2020 00:00:00 GMT+0300 (Eastern European Summer Time)
const areDatesEqual = (dateA, dateB) => {
  return dateA.getTime() === dateB.getTime();
};

const fromISOStringToDate = isoString => new Date(Date.parse(isoString));

export {
  getOnlyLocalDate, getLocalIsoString, areDatesEqual, fromISOStringToDate,
};
