const serve = require('yoshi-common/serve');

serve()
  .then(() => {
    console.log('Server and CDN started successfully');
  })
  .catch(errorReason => {
    console.log(errorReason);
  });
