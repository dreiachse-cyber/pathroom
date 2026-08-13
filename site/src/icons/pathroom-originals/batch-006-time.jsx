import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomCountdownRing = createOriginalIcon(
  "IconPathroomCountdownRing",
  <>
    <path d="M12 4 A8 8 0 1 1 6.3 6.3" />
    <path d="M5 3 V7 H9" />
    <path d="M12 8 V12 L9 15" />
    <path d="M8 19 H8.5 M11.75 20 H12.25 M15.5 19 H16" />
  </>,
);

export const IconPathroomWorkShift = createOriginalIcon(
  "IconPathroomWorkShift",
  <>
    <circle cx="9" cy="11" r="6" />
    <path d="M9 8 V11 L12 13" />
    <rect x="13" y="12" width="8" height="7" rx="1.5" />
    <path d="M16 12 V10 H18 V12 M13 15 H21" />
  </>,
);

export const IconPathroomDateRange = createOriginalIcon(
  "IconPathroomDateRange",
  <>
    <rect x="3" y="4" width="7" height="8" rx="1" />
    <path d="M5 3 V5 M8 3 V5 M3 7 H10" />
    <rect x="14" y="12" width="7" height="8" rx="1" />
    <path d="M16 11 V13 M19 11 V13 M14 15 H21" />
    <path d="M11 8 H16 M14 6 L16 8 L14 10" />
  </>,
);

export const IconPathroomRecurringSchedule = createOriginalIcon(
  "IconPathroomRecurringSchedule",
  <>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M7 3 V6 M17 3 V6 M3 9 H21" />
    <path d="M8 14 C9 11 13 10 16 12 L18 14 M18 11 V14 H15" />
    <path d="M16 17 C14 20 10 20 8 17 L6 15 M6 18 V15 H9" />
  </>,
);

export const IconPathroomFocusTimer = createOriginalIcon(
  "IconPathroomFocusTimer",
  <>
    <path d="M12 6 C7 4 4 8 4 13 C4 18 7.5 21 12 21 C16.5 21 20 18 20 13 C20 8 17 4 12 6 Z" />
    <path d="M12 6 C11 4 9 3 7 3 M12 6 C13 4 15 3 17 4 M12 6 V3" />
    <path d="M12 10 V13 L15 15" />
  </>,
);

export const IconPathroomDeadlineFlag = createOriginalIcon(
  "IconPathroomDeadlineFlag",
  <>
    <circle cx="9" cy="14" r="6" />
    <path d="M9 11 V14 L12 16" />
    <path d="M16 3 V21" />
    <path d="M16 4 H21 L19 7 L21 10 H16" />
  </>,
);

export const IconPathroomTimeAllocation = createOriginalIcon(
  "IconPathroomTimeAllocation",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3 V12 H21" />
    <path d="M12 12 L6 19" />
    <circle cx="12" cy="12" r="1.5" />
  </>,
);

export const IconPathroomClockSync = createOriginalIcon(
  "IconPathroomClockSync",
  <>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 9 V12 L15 14" />
    <path d="M5 8 C7 4 12 2 17 5 L19 7 M19 3 V7 H15" />
    <path d="M19 16 C17 20 12 22 7 19 L5 17 M5 21 V17 H9" />
  </>,
);
