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
 * Peers of ticker
 *
 * https://iexcloud.io/docs/api/#peers
 *
 * @param {object} options
 * @param {string} options.symbol ticker to request
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 * @param {string} standardOptions.filter https://iexcloud.io/docs/api/#filter-results
 * @param {string} standardOptions.format output format
 */
export const relevant = (symbol, { token, version, filter, format } = {}) => {
  _raiseIfNotStr(symbol);
  return _get({
    url: `stock/${_quoteSymbols(symbol)}/relevant`,
    token,
    version,
    filter,
    format,
  });
};

Client.prototype.relevant = function (options, standardOptions) {
  return relevant(options, {
    token: this._token,
    version: this._version,
    ...standardOptions,
  });
};
