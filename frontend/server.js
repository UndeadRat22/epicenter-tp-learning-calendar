/* eslint-disable import/no-extraneous-dependencies */
const serve = require('yoshi-common/serve');

serve()
  .then(() => {
    console.info('Yoshi started succesfully');
  })
  .catch(errorReason => {
    console.log(errorReason);
  });
