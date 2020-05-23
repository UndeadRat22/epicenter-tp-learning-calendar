import moment from 'moment';

const getOnlyLocalDate = date => {
  return moment(date).toISOString(true).slice(0, 10);
};

const getLocalIsoString = date => {
  return new Date(moment(date).toISOString(true).slice(0, 10)).toISOString();
};

export { getOnlyLocalDate, getLocalIsoString };
