/* eslint-disable no-unused-vars */
/* ***************************************************************************
 *
 * Copyright (c) 2021, the iexjs authors.
 *
 * This file is part of the iexjs library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
/* eslint-disable no-undef */

const fetch = require("cross-fetch");
const { Client } = require("../src/js");

const SYMBOL = "BAC";

beforeAll(() => {
  global.fetch = fetch;
});

// retry twice and set timeout to 30s for long calls
jest.retryTimes(2);
jest.setTimeout(50000);

afterEach(async () => {
  await new Promise((r) => setTimeout(r, 500));
});

describe("Client - FX", () => {
  test("latestFX", async () => {
    const client = new Client({ version: "sandbox" });
    const res = await client.latestFX({ symbols: "EURUSD" });
  });
  test("convertFX", async () => {
    const client = new Client({ version: "sandbox" });
    const res = await client.convertFX({ symbols: "EURUSD", amount: 5 });
  });
  test("historicalFX", async () => {
    const client = new Client({ version: "sandbox" });
    const res = await client.historicalFX({
      symbols: "EURUSD",
      date: "20210201",
    });
  });
});
