import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomContextMenu = createOriginalIcon(
  "IconPathroomContextMenu",
  <>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <circle cx="7" cy="8" r="1" />
    <circle cx="7" cy="12" r="1" />
    <circle cx="7" cy="16" r="1" />
    <line x1="10" y1="8" x2="17" y2="8" />
    <line x1="10" y1="12" x2="17" y2="12" />
    <line x1="10" y1="16" x2="15" y2="16" />
  </>,
);

export const IconPathroomTooltipPopup = createOriginalIcon(
  "IconPathroomTooltipPopup",
  <>
    <rect x="3" y="4" width="18" height="12" rx="3" />
    <path d="M9 16 L12 20 L15 16" />
    <circle cx="8" cy="10" r="1" />
    <path d="M12 10 H17" />
  </>,
);

export const IconPathroomBottomSheet = createOriginalIcon(
  "IconPathroomBottomSheet",
  <>
    <path d="M3 21 V12 C3 10.9 3.9 10 5 10 H19 C20.1 10 21 10.9 21 12 V21" />
    <path d="M9 13 H15" />
    <path d="M5 4 H14 M5 7 H19" />
  </>,
);

export const IconPathroomMarqueeSelect = createOriginalIcon(
  "IconPathroomMarqueeSelect",
  <>
    <path d="M4 8 V4 H8 M16 4 H20 V8 M20 16 V20 H16 M8 20 H4 V16" />
    <polygon points="9 8 9 18 12 15 14 20 17 18 14 14 19 14" />
  </>,
);

export const IconPathroomFloatingActionButton = createOriginalIcon(
  "IconPathroomFloatingActionButton",
  <>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M6 7 H14 M6 11 H11" />
    <circle cx="16" cy="16" r="4" />
    <path d="M14 16 H18 M16 14 V18" />
  </>,
);

export const IconPathroomChipInput = createOriginalIcon(
  "IconPathroomChipInput",
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <rect x="6" y="9" width="7" height="6" rx="3" />
    <path d="M9 11 L11 13 M11 11 L9 13" />
    <line x1="16" y1="9" x2="16" y2="15" />
  </>,
);

export const IconPathroomSkeletonLoader = createOriginalIcon(
  "IconPathroomSkeletonLoader",
  <>
    <circle cx="7" cy="8" r="3" />
    <path d="M3 15 H10 M3 19 H9" />
    <rect x="12" y="5" width="9" height="4" rx="2" />
    <rect x="12" y="11" width="7" height="3" rx="1.5" />
    <rect x="12" y="16" width="9" height="3" rx="1.5" />
  </>,
);

export const IconPathroomScrollablePanel = createOriginalIcon(
  "IconPathroomScrollablePanel",
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 7 H14 M7 11 H14 M7 15 H13" />
    <line x1="18" y1="6" x2="18" y2="18" />
    <rect x="17" y="8" width="2" height="5" rx="1" />
  </>,
);
