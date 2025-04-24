const env = require('@blocklet/sdk/lib/env');
const { name, version } = require('../../package.json');
const config = require('@blocklet/sdk/lib/config');
const uniqBy = require('lodash/uniqBy');
const isUrl = require('is-absolute-url');
const logger = require('./logger');

/**
 * @type {string}
 */
const upstreamUrl = process.env.UPSTREAM_URL;

/**
 * @returns {Array<{mountPoint: string, url: string}>}
 */
function getMappings() {
  /**
   * @type {Array<{mountPoint: string, url: string}>}
   */
  let mappings = [];

  if (Array.isArray(config.env.preferences.mappings)) {
    mappings = [
      ...mappings,
      ...config.env.preferences.mappings,
    ]
  }

  if (isUrl(upstreamUrl)) {
    mappings.push({
      mountPoint: '/',
      url: upstreamUrl,
    })
  }

  if (!mappings.length) {
    throw new Error('No mappings found, please check your blocklet preferences or upstream url');
  }

  mappings.sort((a, b) => b.mountPoint.length - a.mountPoint.length);

  logger.info('mappings', uniqBy(mappings, 'mountPoint'));

  return uniqBy(mappings, 'mountPoint');
}

/**
 * @type {Array<{mountPoint: string, url: string}>}
 */
const mappings = getMappings();

module.exports = {
  ...env,
  name,
  version,
  upstreamUrl,
  mappings,
};
