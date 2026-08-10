import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const noticesUrl = new URL("../public/THIRD_PARTY_NOTICES.txt", import.meta.url);
const originalsLicenseUrl = new URL(
  "../public/PATHROOM_ORIGINALS_LICENSE.txt",
  import.meta.url,
);
const indexUrl = new URL("../index.html", import.meta.url);

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

test("public PATHROOM Originals license includes the confirmed MIT terms", async () => {
  const license = await readFile(originalsLicenseUrl, "utf8");

  assert.match(license, /Copyright \(c\) 2026 PATHROOM/);
  assert.match(license, /MIT License/);
  assert.match(license, /Permission is hereby granted, free of charge/);
  assert.match(license, /modify, merge, publish, distribute, sublicense, and\/or sell/);
  assert.match(license, /sale of individual/);
  assert.match(license, /Visible credit is optional/);
  assert.match(license, /include the copyright notice above and the full MIT\s+License text/);
});

test("the AdSense loader is present once with the required attributes", async () => {
  const indexHtml = await readFile(indexUrl, "utf8");
  const scripts = indexHtml.match(/<script\b[\s\S]*?<\/script>/g) || [];
  const adsenseScripts = scripts.filter((script) =>
    script.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"),
  );

  assert.equal(adsenseScripts.length, 1);
  assert.match(adsenseScripts[0], /\basync\b/);
  assert.match(adsenseScripts[0], /client=ca-pub-5535120522674228/);
  assert.match(adsenseScripts[0], /crossorigin="anonymous"/);
});
