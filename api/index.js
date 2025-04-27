require('dotenv-flow').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { mappings } = require('./libs/env');
const logger = require('@blocklet/logger');
const env = require('./libs/env');

const app = express();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3030;
logger.setupAccessLogger(app);

for (const mapping of mappings) {
  console.error(`Proxy to ${mapping.url} on ${mapping.mountPoint}`);
  app.use(mapping.mountPoint, createProxyMiddleware({
    target: mapping.url,
    changeOrigin: false, 
    followRedirects: false,
    ws: true,
    ignorePath: false,
    ...mapping,
  }));
}

app.listen(port, () => {
  console.log(`${env.name} v${env.version} listening on port ${port}`);
});
