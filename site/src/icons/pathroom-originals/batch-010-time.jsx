import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomClockIn = createOriginalIcon(
  "IconPathroomClockIn",
  <>
    <circle cx="14" cy="12" r="7" />
    <path d="M14 8 V12 L17 14" />
    <path d="M3 12 H10 M7 9 L10 12 L7 15" />
  </>,
);

export const IconPathroomClockOut = createOriginalIcon(
  "IconPathroomClockOut",
  <>
    <circle cx="10" cy="12" r="7" />
    <path d="M10 8 V12 L13 14" />
    <path d="M14 12 H21 M18 9 L21 12 L18 15" />
  </>,
);

export const IconPathroomAppointmentReminder = createOriginalIcon(
  "IconPathroomAppointmentReminder",
  <>
    <rect x="3" y="4" width="10" height="11" rx="1.5" />
    <path d="M3 8 H13 M6 3 V6 M10 3 V6" />
    <path d="M15 19 H22 L20.5 17 V14.5 C20.5 13.1 19.4 12 18 12 C16.6 12 15.5 13.1 15.5 14.5 V17 Z M17 21 H19" />
  </>,
);

export const IconPathroomScheduleConflict = createOriginalIcon(
  "IconPathroomScheduleConflict",
  <>
    <path d="M3 12 V4 H14 M3 8 H9 M6 3 V6" />
    <path d="M10 10 H21 V21 H10 Z M10 13 H21" />
    <path d="M14 16 L18 20 M18 16 L14 20" />
  </>,
);

export const IconPathroomTimeBlocking = createOriginalIcon(
  "IconPathroomTimeBlocking",
  <>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M7 3 V6 M17 3 V6 M3 9 H21" />
    <rect x="6" y="12" width="5" height="3" rx="0.5" />
    <rect x="13" y="12" width="5" height="6" rx="1" />
  </>,
);

export const IconPathroomDurationEstimate = createOriginalIcon(
  "IconPathroomDurationEstimate",
  <>
    <circle cx="12" cy="10" r="7" />
    <path d="M12 6 V10 L15 12" />
    <path d="M6 20 H18 M6 18 V22 M18 18 V22" />
  </>,
);

export const IconPathroomBufferTime = createOriginalIcon(
  "IconPathroomBufferTime",
  <>
    <rect x="3" y="5" width="5" height="14" rx="1" />
    <rect x="16" y="5" width="5" height="14" rx="1" />
    <path d="M10 8 H14 M10 16 H14 M10 8 C10 10 11 11 12 12 C11 13 10 14 10 16 M14 8 C14 10 13 11 12 12 C13 13 14 14 14 16" />
  </>,
);

export const IconPathroomRescheduleEvent = createOriginalIcon(
  "IconPathroomRescheduleEvent",
  <>
    <rect x="3" y="3" width="10" height="14" rx="2" />
    <path d="M6 2 V6 M10 2 V6 M3 8 H13" />
    <path d="M16 11 H19 C21 11 22 13 22 15 V16 C22 19 20 21 17 21 H14 M17 18 L14 21 L17 22" />
  </>,
);
