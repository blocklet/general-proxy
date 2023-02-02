const env = require('@blocklet/sdk/lib/env');
const { name, version } = require('../../package.json');

module.exports = {
  ...env,
  name,
  version,
  upstreamUrl: process.env.UPSTREAM_URL,
};
