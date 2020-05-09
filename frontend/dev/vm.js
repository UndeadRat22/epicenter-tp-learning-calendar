/* eslint-disable import/no-extraneous-dependencies */
const { Engine } = require('velocity');
const velocityData = require('./velocity.data.json');

const engine = new Engine({ template: './src/index.vm' });

const debugEnv = process.env.DEBUG;
const cdnEnv = process.env.CDN_URL;

if (debugEnv !== undefined)
  velocityData.debug = debugEnv === 'true';


if (cdnEnv !== undefined)
  velocityData.clientTopology.staticsBaseUrl = cdnEnv;

module.exports = data => {
  return engine.render({
    ...velocityData,
    ...data,
  });
};
