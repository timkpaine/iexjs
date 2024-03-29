/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import { convertToList } from "./common";
import { _get } from "../../common";
import { Client } from "../../client";

/**
 * This call returns an array of symbols that IEX Cloud supports for API calls.
 *
 * https://iexcloud.io/docs/api/#symbols
 *
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const symbols = ({
  token = "",
  version = "",
  filter = "",
  format = "json",
} = {}) =>
  _get({
    url: `ref-data/symbols`,
    token,
    version,
    filter,
    format,
  });

Client.prototype.symbols = function (standardOptions) {
  return symbols({
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This call returns an array of OTC symbols that IEX Cloud supports for API calls.
 *
 * https://iexcloud.io/docs/api/#otc-symbols
 *
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const otcSymbols = ({
  token = "",
  version = "",
  filter = "",
  format = "json",
} = {}) =>
  _get({
    url: `ref-data/otc/symbols`,
    token,
    version,
    filter,
    format,
  });

Client.prototype.otcSymbols = function (standardOptions) {
  return otcSymbols({
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

/**
 * This call returns an array of international symbols that IEX Cloud supports for API calls.
 *
 * https://iexcloud.io/docs/api/#international-symbols
 *
 * @param {object} options
 * @param {string} options.region 2 letter case insensitive string of country codes using ISO 3166-1 alpha-2
 * @param {string} options.exchange Case insensitive string of Exchange using IEX Supported Exchanges list
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const internationalSymbols = (
  { region, exchange } = {},
  { token = "", version = "", filter = "", format = "json" } = {},
) => {
  if (region) {
    return _get({
      url: `ref-data/region/${region}/symbols`,
      token,
      version,
      filter,
      format,
    });
  }
  if (exchange) {
    return _get({
      url: `ref-data/exchange/${exchange}/symbols`,
      token,
      version,
      filter,
      format,
    });
  }
  return _get({
    url: `ref-data/region/us/symbols`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.internationalSymbols = function (options, standardOptions) {
  return internationalSymbols(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

export const symbolsList = ({ token, version } = {}) =>
  convertToList(symbols({ token, version, filter: "symbol" }));

Client.prototype.symbolsList = function () {
  return convertToList(
    symbols({ token: this._token, version: this._version, filter: "symbol" }),
  );
};

export const otcSymbolsList = ({ token, version } = {}) =>
  convertToList(otcSymbols({ token, version, filter: "symbol" }));

Client.prototype.otcSymbolsList = function () {
  return convertToList(
    otcSymbols({
      token: this._token,
      version: this._version,
      filter: "symbol",
    }),
  );
};

export const internationalSymbolsList = (
  { region, exchange } = {},
  { token, version } = {},
) =>
  convertToList(
    internationalSymbols(
      { region, exchange },
      { token, version, filter: "symbol" },
    ),
  );

Client.prototype.internationalSymbolsList = function (options) {
  return convertToList(
    internationalSymbols(options, {
      token: this._token,
      version: this._version,
      filter: "symbol",
    }),
  );
};
