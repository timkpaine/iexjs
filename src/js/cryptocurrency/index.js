/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import { _get } from "../common";
import { Client } from "../client";

/**
 * This returns a current snapshot of the book for a specified cryptocurrency. For REST, you will receive a current snapshot of the current book for the specific cryptocurrency. For SSE Streaming, you will get a full representation of the book updated as often as the book changes. Examples of each are below:
 *
 * https://iexcloud.io/docs/api/#cryptocurrency-book
 *
 * @param {object} options
 * @param {string} options.symbol cryptocurrency ticker
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const cryptoBook = (
  { symbol } = {},
  { token, version, filter, format } = {},
) =>
  _get({
    url: `crypto/${symbol}/book`,
    token,
    version,
    filter,
    format,
  });

Client.prototype.cryptoBook = function (options, standardOptions) {
  return cryptoBook(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This returns the price for a specified cryptocurrency.
 *
 * https://iexcloud.io/docs/api/#cryptocurrency-price
 *
 * @param {object} options
 * @param {string} options.symbol cryptocurrency ticker
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const cryptoPrice = (
  { symbol } = {},
  { token, version, filter, format } = {},
) =>
  _get({
    url: `crypto/${symbol}/price`,
    token,
    version,
    filter,
    format,
  });

Client.prototype.cryptoPrice = function (options, standardOptions) {
  return cryptoPrice(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This returns the price for a specified cryptocurrency.
 *
 * https://iexcloud.io/docs/api/#cryptocurrency-quote
 *
 * @param {object} options
 * @param {string} options.symbol cryptocurrency ticker
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const cryptoQuote = (
  { symbol } = {},
  { token, version, filter, format } = {},
) =>
  _get({
    url: `crypto/${symbol}/quote`,
    token,
    version,
    filter,
    format,
  });

Client.prototype.cryptoQuote = function (options, standardOptions) {
  return cryptoQuote(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};
