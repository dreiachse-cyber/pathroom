import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomBusinessHours = createOriginalIcon(
  "IconPathroomBusinessHours",
  <>
    <path d="M3 9 L5 4 H14 L16 9 C16 11 13 11 13 9 C13 11 10 11 10 9 C10 11 7 11 7 9 C7 11 3 11 3 9 Z" />
    <path d="M5 12 V20 H12" />
    <circle cx="17" cy="16" r="5" />
    <path d="M17 13 V16 L19 18" />
  </>,
);

export const IconPathroomOvertimeHours = createOriginalIcon(
  "IconPathroomOvertimeHours",
  <>
    <circle cx="10" cy="13" r="7" />
    <path d="M10 9 V13 L13 15" />
    <path d="M18 3 C15 5 16 9 19 10 C20 10 21 10 22 9 C21 13 16 14 14 11 C12 8 14 4 18 3 Z" />
  </>,
);

export const IconPathroomTimeOff = createOriginalIcon(
  "IconPathroomTimeOff",
  <>
    <rect x="3" y="4" width="14" height="16" rx="2" />
    <path d="M6 3 V6 M14 3 V6 M3 8 H17" />
    <path d="M11 15 C13 11 19 11 21 15 M11 15 H21 M16 15 V21 M13 21 H19" />
  </>,
);

export const IconPathroomBookingSlot = createOriginalIcon(
  "IconPathroomBookingSlot",
  <>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M7 3 V6 M17 3 V6 M3 9 H21" />
    <rect x="6" y="12" width="12" height="6" rx="1" />
    <path d="M9 15 L11 17 L15 13" />
  </>,
);

export const IconPathroomQueueWaitTime = createOriginalIcon(
  "IconPathroomQueueWaitTime",
  <>
    <path d="M3 7 H11 M3 12 H9 M3 17 H7" />
    <circle cx="16" cy="15" r="6" />
    <path d="M16 11 V15 L19 17" />
  </>,
);

export const IconPathroomMeetingDuration = createOriginalIcon(
  "IconPathroomMeetingDuration",
  <>
    <path d="M3 4 H14 V12 H8 L5 15 V12 H3 Z" />
    <path d="M6 7 H11 M6 9 H9" />
    <circle cx="16" cy="16" r="6" />
    <path d="M16 12 V16 L19 18" />
  </>,
);

export const IconPathroomTravelTime = createOriginalIcon(
  "IconPathroomTravelTime",
  <>
    <path d="M7 3 C4 3 3 5 3 7 C3 10 7 15 7 15 C7 15 11 10 11 7 C11 5 10 3 7 3 Z" />
    <circle cx="7" cy="7" r="1.5" />
    <circle cx="16" cy="15" r="6" />
    <path d="M16 11 V15 L19 17" />
  </>,
);

export const IconPathroomBreakTimer = createOriginalIcon(
  "IconPathroomBreakTimer",
  <>
    <path d="M3 8 H12 V16 C12 18 10 19 8 19 H7 C5 19 3 18 3 16 Z" />
    <path d="M12 10 H14 C16 10 16 14 14 14 H12" />
    <path d="M6 5 C5 3 7 3 6 2 M9 5 C8 3 10 3 9 2" />
    <circle cx="17" cy="17" r="5" />
    <path d="M17 14 V17 L19 18" />
  </>,
);
