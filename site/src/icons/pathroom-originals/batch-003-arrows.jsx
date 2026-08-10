import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomIndentIncrease = createOriginalIcon(
  "IconPathroomIndentIncrease",
  <>
    <path d="M9 5 H21 M9 12 H21 M9 19 H21" />
    <path d="M3 8 L7 12 L3 16 M3 12 H7" />
  </>,
);

export const IconPathroomIndentDecrease = createOriginalIcon(
  "IconPathroomIndentDecrease",
  <>
    <path d="M9 5 H21 M9 12 H21 M9 19 H21" />
    <path d="M7 8 L3 12 L7 16 M3 12 H7" />
  </>,
);

export const IconPathroomWrapForward = createOriginalIcon(
  "IconPathroomWrapForward",
  <>
    <path d="M3 5 H18 C21 5 21 10 18 10 H8" />
    <path d="M11 7 L8 10 L11 13" />
    <path d="M3 15 H16 M3 19 H12" />
  </>,
);

export const IconPathroomStepUp = createOriginalIcon(
  "IconPathroomStepUp",
  <>
    <path d="M3 20 H8 V15 H13 V10 H18 V5" />
    <path d="M14 9 L18 5 L22 9" />
  </>,
);

export const IconPathroomDetourRight = createOriginalIcon(
  "IconPathroomDetourRight",
  <>
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M3 12 H6 C7 12 7 6 10 6 H19" />
    <path d="M16 3 L19 6 L16 9" />
  </>,
);

export const IconPathroomCompressVertical = createOriginalIcon(
  "IconPathroomCompressVertical",
  <>
    <path d="M12 3 V10 M8 6 L12 10 L16 6" />
    <path d="M12 21 V14 M8 18 L12 14 L16 18" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>,
);

export const IconPathroomSpreadHorizontal = createOriginalIcon(
  "IconPathroomSpreadHorizontal",
  <>
    <line x1="3" y1="4" x2="3" y2="20" />
    <line x1="21" y1="4" x2="21" y2="20" />
    <path d="M12 12 H4 M7 9 L4 12 L7 15 M12 12 H20 M17 9 L20 12 L17 15" />
  </>,
);

export const IconPathroomSortAscending = createOriginalIcon(
  "IconPathroomSortAscending",
  <>
    <path d="M3 19 H7 M3 14 H10 M3 9 H13 M3 4 H16" />
    <path d="M20 20 V4 M17 7 L20 4 L22 7" />
  </>,
);
