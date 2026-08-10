export const STEAM_STORE_URL =
  "https://store.steampowered.com/app/4927090/DemonBlade_Pixel_Hyakki_Senkou/";

export const STEAM_PROMO_IMAGES = Object.freeze(
  [
    "floating-01-snow-keyart-v2-1600x320.png",
    "floating-02-crimson-blade-v2-1600x320.png",
    "floating-03-yokai-night-v2-1600x320.png",
  ].map((fileName) => Object.freeze({ fileName })),
);

export const STEAM_PROMO_DISMISS_KEY =
  "pathroom:steam-promo:20260810:dismissed";
export const STEAM_PROMO_VARIANT_KEY =
  "pathroom:steam-promo:20260810:variant";

export function readSteamPromoState(
  storage = getSessionStorage(),
  random = Math.random,
) {
  const fallback = { visible: true, imageIndex: 0 };

  if (!storage) return fallback;

  try {
    const storedIndex = Number.parseInt(
      storage.getItem(STEAM_PROMO_VARIANT_KEY) ?? "",
      10,
    );
    const hasStoredIndex =
      Number.isInteger(storedIndex) &&
      storedIndex >= 0 &&
      storedIndex < STEAM_PROMO_IMAGES.length;
    const randomValue = Number(random());
    const normalizedRandom = Number.isFinite(randomValue)
      ? Math.min(Math.max(randomValue, 0), 0.999999999)
      : 0;
    const imageIndex = hasStoredIndex
      ? storedIndex
      : Math.floor(normalizedRandom * STEAM_PROMO_IMAGES.length);

    if (!hasStoredIndex) {
      storage.setItem(STEAM_PROMO_VARIANT_KEY, String(imageIndex));
    }

    return {
      visible: storage.getItem(STEAM_PROMO_DISMISS_KEY) !== "1",
      imageIndex,
    };
  } catch {
    return fallback;
  }
}

export function persistSteamPromoDismissal(storage = getSessionStorage()) {
  try {
    storage?.setItem(STEAM_PROMO_DISMISS_KEY, "1");
  } catch {
    // The close action should still work when storage is unavailable.
  }
}

function getSessionStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
