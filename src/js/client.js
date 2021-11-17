/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
/* eslint-disable max-classes-per-file */
/* eslint-disable new-cap */

import { IEXJSException } from "./common";

export class Client {
  static premium = class Premium {};

  static premiumfiles = class PremiumFiles {};

  constructor(options = {}) {
    const { api_token = (process ? process.env.IEX_TOKEN : null) || "" } =
      options;

    let { version = "v1" } = options;

    this._token = api_token;

    if (!this._token) {
      throw IEXJSException(
        "API Token missing or not in environment (IEX_TOKEN)",
      );
    }

    if (["beta", "stable", "v1", "sandbox"].indexOf(version) < 0) {
      throw IEXJSException("Unrecognized api version: {}".format(version));
    }

    if (this._token.startsWith("T") && version !== "sandbox") {
      // eslint-disable-next-line no-console
      console.warn(
        "Using test key but attempting to connect to non-sandbox environment. Switching to sandbox",
      );
      version = "sandbox";
    }

    this._version = version;

    // this is easier than worrying about rebinding
    this.premium = new Client.premium();
    this.premiumfiles = new Client.premiumfiles();
    this.premium._token = this._token;
    this.premium._version = this._version;
  }
}
