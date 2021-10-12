/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import { _get, _raiseIfNotStr, _quoteSymbols, _strOrDate } from "../common";
import { Client } from "../client";

/**
 * The following are IEX-listed securities that have an aggregate fail to deliver position for five consecutive settlement days at a registered clearing agency, totaling 10,000 shares or more and equal to at least 0.5% of the issuer’s total shares outstanding (i.e., “threshold securities”).
 *   The report data will be published to the IEX website daily at 8:30 p.m. ET with data for that trading day.
 *
 * https://iexcloud.io/docs/api/#listed-regulation-sho-threshold-securities-list-in-dev
 *
 * @param {object} options
 * @param {string} options.date date
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const threshold = (
  { date } = {},
  { token, version, filter, format } = {},
) => {
  if (date) {
    return _get({
      url: `stock/market/threshold-securities/${_strOrDate(date)}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `stock/market/threshold-securities`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.threshold = function (options, standardOptions) {
  return threshold(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * The consolidated market short interest positions in all IEX-listed securities are included in the IEX Short Interest Report.
 *
 * https://iexcloud.io/docs/api/#listed-short-interest-list-in-dev
 *
 * @param {object} options
 * @param {string} options.symbol Ticker to request
 * @param {string} options.date Effective Datetime
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const shortInterest = (
  { symbol, date } = {},
  { token, version, filter, format } = {},
) => {
  _raiseIfNotStr(symbol);
  if (date) {
    return _get({
      url: `stock/${_quoteSymbols(symbol)}/short-interest/${_strOrDate(date)}`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `stock/${_quoteSymbols(symbol)}/short-interest`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.shortInterest = function (options, standardOptions) {
  return shortInterest(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};
