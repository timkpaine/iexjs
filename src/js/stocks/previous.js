/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import { _get, _quoteSymbols, _raiseIfNotStr } from "../common";
import { Client } from "../client";

/**
 * This returns previous day adjusted price data for one or more stocks
 *
 * https://iexcloud.io/docs/api/#previous-day-prices
 *
 * @param {string} symbol ticker to request
 * @param {string} token Access token
 * @param {string} version API version
 * @param {string} filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} format output format
 */
export const yesterday = (symbol, { token, version, filter, format } = {}) => {
  _raiseIfNotStr(symbol);
  return _get({
    url: `stock/${_quoteSymbols(symbol)}/previous`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.yesterday = function (symbol, { filter, format } = {}) {
  return yesterday(symbol, {
    token: this._token,
    version: this._version,
    filter,
    format,
  });
};

export const previous = yesterday;
Client.prototype.previous = Client.prototype.yesterday;

/**
 * This returns previous day adjusted price data for whole market
 *
 * @param {string} token Access token
 * @param {string} version API version
 * @param {string} filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} format output format
 */
export const marketYesterday = ({ token, version, filter, format } = {}) =>
  _get({
    url: `stock/market/previous`,
    token,
    version,
    filter,
    format,
  });

Client.prototype.marketYesterday = function ({ filter, format } = {}) {
  return marketYesterday({
    token: this._token,
    version: this._version,
    filter,
    format,
  });
};

export const marketPrevious = marketYesterday;
Client.prototype.marketPrevious = Client.prototype.marketYesterday;
