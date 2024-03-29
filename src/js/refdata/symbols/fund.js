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
 * This call returns an array of mutual fund symbols that IEX Cloud supports for API calls.
 *
 * https://iexcloud.io/docs/api/#mutual-fund-symbols
 *
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const mutualFundSymbols = ({
  token = "",
  version = "",
  filter = "",
  format = "json",
} = {}) =>
  _get({
    url: `ref-data/mutual-funds/symbols`,
    token,
    version,
    filter,
    format,
  });

Client.prototype.mutualFundSymbols = function (standardOptions) {
  return mutualFundSymbols({
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};

export const mutualFundSymbolsList = ({ token, version } = {}) =>
  convertToList(mutualFundSymbols({ token, version, filter: "symbol" }));

Client.prototype.mutualFundSymbolsList = function () {
  return convertToList(
    mutualFundSymbols({
      token: this._token,
      version: this._version,
      filter: "symbol",
    }),
  );
};
