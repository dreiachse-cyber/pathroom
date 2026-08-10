import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomToggleOn = createOriginalIcon(
  "IconPathroomToggleOn",
  <>
    <rect x="3" y="7" width="18" height="10" rx="5" />
    <circle cx="16" cy="12" r="3" />
  </>,
);

export const IconPathroomCursorClick = createOriginalIcon(
  "IconPathroomCursorClick",
  <>
    <polygon points="4 3 4 17 8 14 11 21 14 19 11 13 18 13" />
    <path d="M13 3 V6 M18 5 L16 7 M20 10 H17" />
  </>,
);

export const IconPathroomSidebarLayout = createOriginalIcon(
  "IconPathroomSidebarLayout",
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="8" y1="3" x2="8" y2="21" />
    <path d="M11 7 H18 M11 11 H16" />
  </>,
);

export const IconPathroomTabStrip = createOriginalIcon(
  "IconPathroomTabStrip",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9 H21 M8 4 V9 M14 4 V9 M5 7 H6" />
  </>,
);

export const IconPathroomTextField = createOriginalIcon(
  "IconPathroomTextField",
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <line x1="8" y1="9" x2="8" y2="15" />
    <path d="M12 12 H18" />
  </>,
);

export const IconPathroomAccordionList = createOriginalIcon(
  "IconPathroomAccordionList",
  <>
    <rect x="3" y="3" width="18" height="5" rx="1" />
    <rect x="3" y="9.5" width="18" height="5" rx="1" />
    <rect x="3" y="16" width="18" height="5" rx="1" />
    <path d="M17 5 L19 6 L17 7 M17 11.5 L19 12.5 L17 13.5 M17 18 L19 19 L17 20" />
  </>,
);

export const IconPathroomToastNotice = createOriginalIcon(
  "IconPathroomToastNotice",
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="7" cy="12" r="2" />
    <path d="M11 10 H18 M11 14 H16" />
  </>,
);

export const IconPathroomPaginationDots = createOriginalIcon(
  "IconPathroomPaginationDots",
  <>
    <path d="M5 9 L2 12 L5 15 M19 9 L22 12 L19 15" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="13" cy="12" r="2" />
    <circle cx="17" cy="12" r="1" />
  </>,
);
