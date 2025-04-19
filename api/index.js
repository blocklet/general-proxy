require('dotenv-flow').config();

const express = require('express');
const logger = require('@blocklet/logger');
const { createProxyMiddleware } = require('http-proxy-middleware');

const env = require('./libs/env');

const app = express();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3030;
logger.setupAccessLogger(app);

app.use(createProxyMiddleware({ target: env.upstreamUrl, changeOrigin: false, followRedirects: false, ws: true }));

app.listen(port, () => {
  console.log(`${env.name} v${env.version} listening on port ${port}`);
});
