/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
import {
  _SSE_DEEP_URL_PREFIX,
  _SSE_DEEP_URL_PREFIX_SANDBOX,
  _SSE_URL_PREFIX,
  _SSE_URL_PREFIX_ALL,
  _SSE_URL_PREFIX_ALL_SANDBOX,
  _SSE_URL_PREFIX_SANDBOX,
  IEXJSException,
  _strCommaSeparatedString,
  _streamSSE,
  _strToList,
} from "../common";
import { Client } from "../client";

export const TRADINGSTATUS = "tradingstatus";
export const AUCTION = "auction";
export const OPHALTSTATUS = "op-halt-status";
export const SSR = "ssr-status";
export const SECURITYEVENT = "security-event";
export const TRADEBREAK = "trade-breaks";
export const TRADES = "trades";
export const BOOK = "book";
export const SYSTEMEVENT = "system-event";
export const ALL = "deep";

export const _runSSE = (
  method,
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => {
  if (!method) {
    throw new IEXJSException("method cannot be blank");
  }

  if (symbols) {
    if (version === "sandbox") {
      return _streamSSE(
        _SSE_URL_PREFIX_SANDBOX(
          version,
          method,
          _strCommaSeparatedString(symbols),
          token,
        ),
        on_data,
        nosnapshot,
      );
    }
    return _streamSSE(
      _SSE_URL_PREFIX(
        version,
        method,
        _strCommaSeparatedString(symbols),
        token,
      ),
      on_data,
      nosnapshot,
    );
  }
  if (version === "sandbox") {
    return _streamSSE(
      _SSE_URL_PREFIX_ALL_SANDBOX(method, token),
      on_data,
      nosnapshot,
    );
  }
  return _streamSSE(
    _SSE_URL_PREFIX_ALL(version, method, token),
    on_data,
    nosnapshot,
  );
};

/**
 * TOPS provides IEX’s aggregated best quoted bid and offer position in near real time for all securities on IEX’s displayed limit order book.
 * TOPS is ideal for developers needing both quote and trade data.
 * https://iexcloud.io/docs/api/#tops
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const topsSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => _runSSE("tops", symbols, on_data, nosnapshot, token, version);

Client.prototype.topsSSE = function (symbols, on_data, nosnapshot) {
  return topsSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * Last provides trade data for executions on IEX. It is a near real time, intraday API that provides IEX last sale price, size and time.
 * Last is ideal for developers that need a lightweight stock quote.
 * https://iexcloud.io/docs/api/#last
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const lastSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => _runSSE("last", symbols, on_data, nosnapshot, { token, version });

Client.prototype.lastSSE = function (symbols, on_data, nosnapshot) {
  return lastSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * DEEP is used to receive real-time depth of book quotations direct from IEX.
 * The depth of book quotations received via DEEP provide an aggregated size of resting displayed orders at a price and side,
 * and do not indicate the size or number of individual orders at any price level.
 * Non-displayed orders and non-displayed portions of reserve orders are not represented in DEEP.
 *
 * DEEP also provides last trade price and size information. Trades resulting from either displayed or non-displayed orders matching on IEX will be reported. Routed executions will not be reported.
 *
 * https://iexcloud.io/docs/api/#deep
 * @param {string} symbols Tickers to request
 * @param {string} channels deep channels to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const deepSSE = (
  symbols,
  channels,
  on_data,
  nosnapshot,
  { token, version } = {},
) => {
  if (!channels) {
    throw new IEXJSException("Must specify channels for deepSSE endpoints");
  }

  _strToList(channels).forEach((channel) => {
    if (
      [
        TRADINGSTATUS,
        AUCTION,
        OPHALTSTATUS,
        SSR,
        SECURITYEVENT,
        TRADEBREAK,
        TRADES,
        BOOK,
        SYSTEMEVENT,
        ALL,
      ].indexOf(channel) < 0
    ) {
      throw new IEXJSException(`Deep channel not recognized: ${channel}`);
    }
  });

  // eslint-disable-next-line no-param-reassign
  channels = _strCommaSeparatedString(channels);
  if (version === "sandbox") {
    return _streamSSE(
      _SSE_DEEP_URL_PREFIX_SANDBOX(
        _strCommaSeparatedString(symbols),
        channels,
        token,
      ),
      on_data,
      nosnapshot,
    );
  }
  return _streamSSE(
    _SSE_DEEP_URL_PREFIX(
      version,
      _strCommaSeparatedString(symbols),
      channels,
      token,
    ),
    on_data,
    nosnapshot,
  );
};

Client.prototype.deepSSE = function (symbols, channels, on_data, nosnapshot) {
  return deepSSE(symbols, channels, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * Trade report messages are sent when an order on the IEX Order Book is executed in whole or in part. DEEP sends a Trade report message for every individual fill.
 * https://iexcloud.io/docs/api/#deep-trades
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const tradesSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => {
  if (version === "sandbox") {
    return _streamSSE(
      _SSE_DEEP_URL_PREFIX_SANDBOX(
        _strCommaSeparatedString(symbols),
        "trades",
        token,
      ),
      on_data,
      nosnapshot,
    );
  }
  return _streamSSE(
    _SSE_DEEP_URL_PREFIX(
      version,
      _strCommaSeparatedString(symbols),
      "trades",
      token,
    ),
    on_data,
    nosnapshot,
  );
};

Client.prototype.tradesSSE = function (symbols, on_data, nosnapshot) {
  return tradesSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * DEEP broadcasts an Auction Information Message every one second between the Lock-in Time and the auction match for Opening and Closing Auctions,
 * and during the Display Only Period for IPO, Halt, and Volatility Auctions. Only IEX listed securities are eligible for IEX Auctions.
 * https://iexcloud.io/docs/api/#deep-auction
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const auctionSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => _runSSE("auction", symbols, on_data, nosnapshot, { token, version });

Client.prototype.auctionSSE = function (symbols, on_data, nosnapshot) {
  return auctionSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * Book shows IEX’s bids and asks for given symbols.
 * https://iexcloud.io/docs/api/#deep-book
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const bookSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => _runSSE("book", symbols, on_data, nosnapshot, { token, version });

Client.prototype.bookSSE = function (symbols, on_data, nosnapshot) {
  return bookSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};
/**
 * The Exchange may suspend trading of one or more securities on IEX for operational reasons and indicates such operational halt using the Operational halt status message.
 *
 * IEX disseminates a full pre-market spin of Operational halt status messages indicating the operational halt status of all securities.
 * In the spin, IEX will send out an Operational Halt Message with “N” (Not operationally halted on IEX) for all securities that are eligible for trading at the start of the Pre-Market Session.
 * If a security is absent from the dissemination, firms should assume that the security is being treated as operationally halted in the IEX Trading System at the start of the Pre-Market Session.
 *
 * After the pre-market spin, IEX will use the Operational halt status message to relay changes in operational halt status for an individual security.
 *
 * https://iexcloud.io/docs/api/#deep-operational-halt-status
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const opHaltStatusSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) =>
  _runSSE("op-halt-status", symbols, on_data, nosnapshot, { token, version });

Client.prototype.opHaltStatusSSE = function (symbols, on_data, nosnapshot) {
  return opHaltStatusSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * The Official Price message is used to disseminate the IEX Official Opening and Closing Prices.
 * These messages will be provided only for IEX Listed Securities.
 * https://iexcloud.io/docs/api/#deep-official-price
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const officialPriceSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) =>
  _runSSE("official-price", symbols, on_data, nosnapshot, { token, version });

Client.prototype.officialPriceSSE = function (symbols, on_data, nosnapshot) {
  return officialPriceSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};
/**
 * The Security event message is used to indicate events that apply to a security. A Security event message will be sent whenever such event occurs
 * https://iexcloud.io/docs/api/#deep-security-event
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const securityEventSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) =>
  _runSSE("security-event", symbols, on_data, nosnapshot, { token, version });

Client.prototype.securityEventSSE = function (symbols, on_data, nosnapshot) {
  return securityEventSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};
/**
 * In association with Rule 201 of Regulation SHO, the Short Sale Price Test Message is used to indicate when a short sale price test restriction is in effect for a security.
 *
 * IEX disseminates a full pre-market spin of Short sale price test status messages indicating the Rule 201 status of all securities. After the pre-market spin, IEX will use the Short sale price test status message in the event of an intraday status change.
 *
 * The IEX Trading System will process orders based on the latest short sale price test restriction status.
 *
 * https://iexcloud.io/docs/api/#deep-short-sale-price-test-status
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const ssrStatusSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => _runSSE("ssr-status", symbols, on_data, nosnapshot, { token, version });

Client.prototype.ssrStatusSSE = function (symbols, on_data, nosnapshot) {
  return ssrStatusSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};
/**
 * The System event message is used to indicate events that apply to the market or the data feed.
 *
 * There will be a single message disseminated per channel for each System Event type within a given trading session.
 *
 * https://iexcloud.io/docs/api/#deep-system-event
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const systemEventSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => _runSSE("system-event", symbols, on_data, nosnapshot, { token, version });

Client.prototype.systemEventSSE = function (symbols, on_data, nosnapshot) {
  return systemEventSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * Trade report messages are sent when an order on the IEX Order Book is executed in whole or in part. DEEP sends a Trade report message for every individual fill.
 *
 * https://iexcloud.io/docs/api/#deep-trades
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const tradeBreaksSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) => _runSSE("trade-breaks", symbols, on_data, nosnapshot, { token, version });

Client.prototype.tradeBreaksSSE = function (symbols, on_data, nosnapshot) {
  return tradeBreaksSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};

/**
 * The Trading status message is used to indicate the current trading status of a security.
 * For IEX-listed securities, IEX acts as the primary market and has the authority to institute a trading halt or trading pause in a security due to news dissemination or regulatory reasons.
 * For non-IEX-listed securities, IEX abides by any regulatory trading halts and trading pauses instituted by the primary or listing market, as applicable.
 *
 * IEX disseminates a full pre-market spin of Trading status messages indicating the trading status of all securities.
 * In the spin, IEX will send out a Trading status message with “T” (Trading) for all securities that are eligible for trading at the start of the Pre-Market Session.
 * If a security is absent from the dissemination, firms should assume that the security is being treated as operationally halted in the IEX Trading System.
 *
 * After the pre-market spin, IEX will use the Trading status message to relay changes in trading status for an individual security. Messages will be sent when a security is:
 *
 * Halted
 * Paused*
 * Released into an Order Acceptance Period*
 * Released for trading
 * *The paused and released into an Order Acceptance Period status will be disseminated for IEX-listed securities only. Trading pauses on non-IEX-listed securities will be treated simply as a halt.
 *
 * https://iexcloud.io/docs/api/#deep-trading-status
 * @param {string} symbols Tickers to request
 * @param {function} on_data Callback on data
 * @param {boolean} nosnapshot
 * @param {object} standardOptions
 * @param {string} standardOptions.token Access token
 * @param {string} standardOptions.version API version
 */
export const tradingStatusSSE = (
  symbols,
  on_data,
  nosnapshot,
  { token, version } = {},
) =>
  _runSSE("trading-status", symbols, on_data, nosnapshot, { token, version });

Client.prototype.tradingStatusSSE = function (symbols, on_data, nosnapshot) {
  return tradingStatusSSE(symbols, on_data, nosnapshot, {
    token: this._token,
    version: this._version,
  });
};
