/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
import { _raiseIfNotStr, _timeseriesWrapper } from "../common";
import { Client } from "../client";
import { timeSeries } from "../timeseries";

/**
 * Fundamental Valuations
 *
 * @param {object} options
 * @param {string} options.symbol Ticker to request
 * @param {string} options.frequency
 * @param {object} timeseriesArgs
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format

 */
export const fundamentalValuations = (
  { symbol, frequency } = {},
  timeseriesArgs,
  { token, version, filter, format } = {},
) => {
  _raiseIfNotStr(symbol);
  _timeseriesWrapper(timeseriesArgs);

  return timeSeries(
    {
      id: "fundamental_valuations",
      key: symbol,
      subkey: frequency || "",
      ...(timeseriesArgs || {}),
    },
    { token, version, filter, format },
  );
};

Client.prototype.fundamentalValuations = function (
  options,
  timeseriesArgs,
  standardOptions,
) {
  return fundamentalValuations(options, timeseriesArgs, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};
