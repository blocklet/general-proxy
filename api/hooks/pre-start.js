require('@blocklet/sdk/lib/error-handler');
require('dotenv-flow').config();
const { mappings } = require('../libs/env');

(() => {
  if (Array.isArray(mappings)) {
    console.info(`Proxy to upstream:`, mappings);
    process.exit(0);
  } else {
    console.error('UPSTREAM_URL must be an absolute URL');
    process.exit(1);
  }
})();
