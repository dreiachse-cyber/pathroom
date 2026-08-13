import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomPurchaseOrder = createOriginalIcon(
  "IconPathroomPurchaseOrder",
  <>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M8 10 H10 V12 H8 Z M13 11 H16 M8 15 H10 V17 H8 Z M13 16 H16" />
  </>,
);

export const IconPathroomShippingLabel = createOriginalIcon(
  "IconPathroomShippingLabel",
  <>
    <path d="M4 5 H17 L20 8 V19 H4 Z M17 5 V8 H20" />
    <path d="M7 9 H13 M7 12 V16 M9 12 V16 M12 12 V16 M15 12 V16 M17 12 V16" />
  </>,
);

export const IconPathroomOrderTracking = createOriginalIcon(
  "IconPathroomOrderTracking",
  <>
    <path d="M3 6 L9 3 L15 6 V13 L9 16 L3 13 Z M3 6 L9 9 L15 6 M9 9 V16" />
    <path d="M18 10 C15 10 14 12 14 14 C14 17 18 21 18 21 C18 21 22 17 22 14 C22 12 21 10 18 10 Z" />
    <circle cx="18" cy="14" r="1" />
  </>,
);

export const IconPathroomBackorderNotice = createOriginalIcon(
  "IconPathroomBackorderNotice",
  <>
    <path d="M3 5 H14 V18 H3 Z M3 10 H14 M8.5 5 V10 M5 14 H10" />
    <circle cx="17" cy="17" r="4" />
    <path d="M17 15 V17 L19 18" />
  </>,
);

export const IconPathroomPriceDropAlert = createOriginalIcon(
  "IconPathroomPriceDropAlert",
  <>
    <path d="M3 5 H12 L17 10 L10 17 L3 10 Z" />
    <circle cx="7" cy="9" r="1" />
    <path d="M19 5 V17 M16 14 L19 17 L22 14" />
    <path d="M16 20 H22" />
  </>,
);

export const IconPathroomAuctionBid = createOriginalIcon(
  "IconPathroomAuctionBid",
  <>
    <path d="M4 6 L7 3 L12 8 L9 11 Z" />
    <path d="M9 10 L18 19" />
    <path d="M14 21 H22 M16 18 V21 M20 18 V21" />
  </>,
);

export const IconPathroomEscrowHold = createOriginalIcon(
  "IconPathroomEscrowHold",
  <>
    <path d="M12 3 L20 6 V12 C20 17 17 20 12 22 C7 20 4 17 4 12 V6 Z" />
    <circle cx="12" cy="11" r="4" />
    <path d="M10.5 9 V13 M13.5 9 V13" />
  </>,
);

export const IconPathroomDigitalStorefront = createOriginalIcon(
  "IconPathroomDigitalStorefront",
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 7 H21 M6 5 H6.5 M9 5 H9.5" />
    <path d="M6 12 L8 9 H16 L18 12 M7 12 V19 H17 V12" />
  </>,
);
