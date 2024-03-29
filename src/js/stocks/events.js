/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
/* eslint-disable no-param-reassign */

import { _get, _strToList, _quoteSymbols } from "../common";
import { Client } from "../client";

const _baseEvents = (
  { event, symbol, exactDate } = {},
  { token, version, filter, format } = {},
) => {
  // default to all events
  event = event || "events";

  // process symbol
  symbol = _strToList(symbol);

  // build url
  let url;

  if (symbol.length === 0) {
    // full market
    url = `stock/market/upcoming-${event}`;
  } else if (Symbol.length === 1) {
    // just 1 symbol
    url = `stock/${_quoteSymbols(symbol)}/upcoming-${event}`;
  } else {
    // many symbols
    url = `stock/market/upcoming-${event}?symbols=${_quoteSymbols(symbol)}`;
  }

  if (exactDate && symbol.length > 1) {
    url += `&exactDate=${exactDate}`;
  } else if (exactDate) {
    url += `?exactDate=${exactDate}`;
  }

  return _get({
    url,
    token,
    version,
    filter,
    format,
  });
};

/**
 * This will return all upcoming estimates, dividends, splits for a given symbol or the market. If market is passed for the symbol, IPOs will also be included.
 *
 * https://iexcloud.io/docs/api/#upcoming-events
 *
 * @param {object} options
 * @param {string} options.symbol Symbol to look up, or blank for `market`
 * @param {string} options.exactDate Optional. Exact date for which to get data
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const upcomingEvents = (
  { symbol, exactDate } = {},
  { token, version, filter, format } = {},
) =>
  _baseEvents(
    { event: "events", symbol, exactDate },
    {
      token,
      version,
      filter,
      format,
    },
  );

Client.prototype.upcomingEvents = function (options, standardOptions) {
  return upcomingEvents(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This will return all upcoming estimates, dividends, splits for a given symbol or the market. If market is passed for the symbol, IPOs will also be included.
 *
 * https://iexcloud.io/docs/api/#upcoming-events
 *
 * @param {object} options
 * @param {string} options.symbol Symbol to look up
 * @param {string} options.exactDate Optional. Exact date for which to get data
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const upcomingEarnings = (
  { symbol, exactDate } = {},
  { token, version, filter, format } = {},
) =>
  _baseEvents(
    { event: "earnings", symbol, exactDate },
    {
      token,
      version,
      filter,
      format,
    },
  );

Client.prototype.upcomingEarnings = function (options, standardOptions) {
  return upcomingEarnings(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This will return all upcoming estimates, dividends, splits for a given symbol or the market. If market is passed for the symbol, IPOs will also be included.
 *
 * https://iexcloud.io/docs/api/#upcoming-events
 *
 * @param {object} options
 * @param {string} options.symbol Symbol to look up
 * @param {string} options.exactDate Optional. Exact date for which to get data
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const upcomingDividends = (
  { symbol, exactDate } = {},
  { token, version, filter, format } = {},
) =>
  _baseEvents(
    { event: "dividends", symbol, exactDate },
    {
      token,
      version,
      filter,
      format,
    },
  );

Client.prototype.upcomingDividends = function (options, standardOptions) {
  return upcomingDividends(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This will return all upcoming estimates, dividends, splits for a given symbol or the market. If market is passed for the symbol, IPOs will also be included.
 *
 * https://iexcloud.io/docs/api/#upcoming-events
 *
 * @param {object} options
 * @param {string} options.symbol Symbol to look up
 * @param {string} options.exactDate Optional. Exact date for which to get data
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const upcomingSplits = (
  { symbol, exactDate } = {},
  { token, version, filter, format } = {},
) =>
  _baseEvents(
    { event: "splits", symbol, exactDate },
    {
      token,
      version,
      filter,
      format,
    },
  );

Client.prototype.upcomingSplits = function (options, standardOptions) {
  return upcomingSplits(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This will return all upcoming estimates, dividends, splits for a given symbol or the market. If market is passed for the symbol, IPOs will also be included.
 *
 * https://iexcloud.io/docs/api/#upcoming-events
 *
 * @param {object} options
 * @param {string} options.symbol Symbol to look up
 * @param {string} options.exactDate Optional. Exact date for which to get data
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const upcomingIPOs = (
  { symbol, exactDate } = {},
  { token, version, filter, format } = {},
) =>
  _baseEvents(
    { event: "ipos", symbol, exactDate },
    {
      token,
      version,
      filter,
      format,
    },
  );

Client.prototype.upcomingIPOs = function (options, standardOptions) {
  return upcomingIPOs(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};
