import assert from "node:assert/strict";
import test from "node:test";
import {
  persistSteamPromoDismissal,
  readSteamPromoState,
  STEAM_PROMO_DISMISS_KEY,
  STEAM_PROMO_IMAGES,
  STEAM_PROMO_VARIANT_KEY,
  STEAM_STORE_URL,
} from "../src/steam-promo.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    value(key) {
      return values.get(key);
    },
  };
}

test("Steam promotion metadata is fixed to three immutable banner assets", () => {
  assert.equal(
    STEAM_STORE_URL,
    "https://store.steampowered.com/app/4927090/DemonBlade_Pixel_Hyakki_Senkou/",
  );
  assert.deepEqual(
    STEAM_PROMO_IMAGES.map((image) => image.fileName),
    [
      "floating-01-snow-keyart-v2-1600x320.png",
      "floating-02-crimson-blade-v2-1600x320.png",
      "floating-03-yokai-night-v2-1600x320.png",
    ],
  );
  assert.ok(Object.isFrozen(STEAM_PROMO_IMAGES));
  assert.ok(STEAM_PROMO_IMAGES.every(Object.isFrozen));
});

test("the promotion chooses and retains one variant per session", () => {
  const storage = createStorage();
  const initial = readSteamPromoState(storage, () => 0.9);

  assert.deepEqual(initial, { visible: true, imageIndex: 2 });
  assert.equal(storage.value(STEAM_PROMO_VARIANT_KEY), "2");
  assert.deepEqual(readSteamPromoState(storage, () => 0), initial);
});

test("dismissal remains effective for the current session", () => {
  const storage = createStorage({ [STEAM_PROMO_VARIANT_KEY]: "1" });

  persistSteamPromoDismissal(storage);

  assert.equal(storage.value(STEAM_PROMO_DISMISS_KEY), "1");
  assert.deepEqual(readSteamPromoState(storage, () => 0), {
    visible: false,
    imageIndex: 1,
  });
});

test("storage failures fall back to the snow banner without blocking close", () => {
  const brokenStorage = {
    getItem() {
      throw new Error("storage disabled");
    },
    setItem() {
      throw new Error("storage disabled");
    },
  };

  assert.deepEqual(readSteamPromoState(brokenStorage, () => 0.9), {
    visible: true,
    imageIndex: 0,
  });
  assert.doesNotThrow(() => persistSteamPromoDismissal(brokenStorage));
});
