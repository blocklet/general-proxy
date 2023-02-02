require('@blocklet/sdk/lib/error-handler');
require('dotenv-flow').config();

const isUrl = require('is-absolute-url');

(() => {
  if (isUrl(process.env.UPSTREAM_URL)) {
    console.info(`Proxy to upstream: ${process.env.UPSTREAM_URL}`);
    process.exit(0);
  } else {
    console.error('UPSTREAM_URL must be an absolute URL');
    process.exit(1);
  }
})();
