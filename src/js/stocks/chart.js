/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import {
  _TIMEFRAME_CHART,
  IEXJSException,
  _get,
  _quoteSymbols,
  _raiseIfNotStr,
  _strOrDate,
} from "../common";
import { Client } from "../client";

/**
 * Historical price/volume data, daily and intraday
 *
 * https://iexcloud.io/docs/api/#historical-prices
 *
 * @param {object} options
 * @param {string} options.symbol ticker to request
 * @param {string} options.range Timeframe to request e.g. 1m
 * @param {string} options.date date, if requesting intraday
 * @param {string} options.exactDate Same as `date`, takes precedence
 * @param {number} options.last If passed, chart data will return the last N elements from the time period defined by the range parameter
 * @param {boolean} options.closeOnly Will return adjusted data only with keys date, close, and volume.
 * @param {boolean} options.byDay Used only when range is date to return OHLCV data instead of minute bar data.
 * @param {boolean} options.simplifyIf true, runs a polyline simplification using the Douglas-Peucker algorithm. This is useful if plotting sparkline charts.
 * @param {number} options.intervalIf passed, chart data will return every Nth element as defined by chartInterval
 * @param {boolean} options.changeFromClose If true, changeOverTime and marketChangeOverTime will be relative to previous day close instead of the first value.
 * @param {boolean} options.displayPercent If set to true, all percentage values will be multiplied by a factor of 100 (Ex: /stock/twtr/chart?displayPercent=true)
 * @param {string} options.range Same format as the path parameter. This can be used for batch calls.
 * @param {string} options.sort Can be "asc" or "desc" to sort results by date. Defaults to "desc"
 * @param {boolean} options.includeToday If true, current trading day data is appended
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const chart = (options, { token, version, filter, format } = {}) => {
  const {
    symbol,
    range = "1m",
    date = "",
    exactDate = "",
    last = -1,
    closeOnly = false,
    byDay = false,
    simplify = false,
    interval = -1,
    changeFromClose = false,
    displayPercent = false,
    sort = "",
    includeToday = false,
  } = options || {};

  _raiseIfNotStr(symbol);
  let base_url = `stock/${_quoteSymbols(symbol)}/chart/${range}?`;

  // exactDate takes precedence
  let thedate = exactDate || date;
  if (thedate) {
    thedate = _strOrDate(thedate);
  }

  if (range && range !== "1d") {
    if (_TIMEFRAME_CHART.indexOf(range) < 0) {
      throw new IEXJSException(`Range not recognized ${range}`);
    }
  }

  // Assemble params
  const params = {};

  if (last > 0) params.chartLast = last;
  if (closeOnly) params.chartCloseOnly = closeOnly;
  if (byDay) params.chartByDay = byDay;
  if (simplify) params.chartSimplify = simplify;
  if (interval > 0) params.chartInterval = interval;
  if (changeFromClose) params.changeFromClose = changeFromClose;
  if (displayPercent) params.displayPercent = displayPercent;
  if (exactDate) params.exactDate = exactDate;
  if (sort) {
    if (sort.toLowerCase() !== "asc" && sort.toLowerCase() !== "desc") {
      throw new IEXJSException(`Sort not recognized: ${sort}`);
    }
    params.sort = sort.toLowerCase();
  }

  if (includeToday) params.includeToday = includeToday;

  if (thedate) {
    base_url = `stock/${_quoteSymbols(symbol)}/chart/date/${thedate}?`;
    if (Object.keys(params).length > 0) {
      base_url += Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    }
    return _get({
      url: base_url,
      token,
      version,
      filter,
      format,
    });
  }

  if (Object.keys(params).length > 0) {
    base_url += Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }
  return _get({
    url: base_url,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.chart = function (options, standardOptions) {
  return chart(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};
