import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const noticesUrl = new URL("../public/THIRD_PARTY_NOTICES.txt", import.meta.url);

test("public third-party notices include the distributed license texts", async () => {
  const notices = await readFile(noticesUrl, "utf8");

  assert.match(notices, /Copyright \(c\) 2020-2026 Paweł Kuna/);
  assert.match(notices, /Permission is hereby granted, free of charge/);
  assert.match(notices, /Copyright \(c\) Meta Platforms, Inc\. and affiliates\./);
  assert.match(notices, /Copyright \(c\) 2019-present, VoidZero Inc\./);
  assert.match(notices, /Copyright 2016 The Inter Project Authors/);
  assert.match(notices, /Google Inc\./);
  assert.match(notices, /SIL OPEN FONT LICENSE Version 1\.1/);
});
