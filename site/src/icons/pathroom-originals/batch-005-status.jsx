import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomOperationalPulse = createOriginalIcon(
  "IconPathroomOperationalPulse",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M4 12 H7 L9 8 L12 16 L14 11 L15 12" />
    <path d="M16 7 L18 9 L21 5" />
  </>,
);

export const IconPathroomPartialOutage = createOriginalIcon(
  "IconPathroomPartialOutage",
  <>
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" />
    <rect x="3" y="13" width="8" height="8" rx="2" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
    <path d="M15 15 L19 19 M19 15 L15 19" />
  </>,
);

export const IconPathroomDegradedService = createOriginalIcon(
  "IconPathroomDegradedService",
  <>
    <rect x="3" y="5" width="4" height="16" rx="1" />
    <rect x="10" y="9" width="4" height="12" rx="1" />
    <rect x="17" y="13" width="4" height="8" rx="1" />
  </>,
);

export const IconPathroomMaintenanceWindow = createOriginalIcon(
  "IconPathroomMaintenanceWindow",
  <>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M7 3 V6 M17 3 V6 M3 9 H21" />
    <path d="M7 18 L16 9 M14 9 H17 V12" />
  </>,
);

export const IconPathroomIncidentBeacon = createOriginalIcon(
  "IconPathroomIncidentBeacon",
  <>
    <path d="M7 17 H17 L16 9 C15 5 9 5 8 9 Z" />
    <path d="M6 17 H18 V21 H6 Z M4 21 H20" />
    <path d="M12 2 V4 M5 4 L7 6 M19 4 L17 6 M3 10 H5 M19 10 H21" />
  </>,
);

export const IconPathroomWorkflowBlocked = createOriginalIcon(
  "IconPathroomWorkflowBlocked",
  <>
    <circle cx="4" cy="6" r="2" />
    <circle cx="20" cy="18" r="2" />
    <path d="M6 6 H8 C9 6 9 10 9 12 M15 12 C15 16 16 18 18 18" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M11 12 H13" />
  </>,
);

export const IconPathroomAwaitingApproval = createOriginalIcon(
  "IconPathroomAwaitingApproval",
  <>
    <rect x="3" y="4" width="12" height="17" rx="2" />
    <path d="M6 9 H12 M6 14 H10" />
    <circle cx="18" cy="17" r="3.5" />
    <path d="M18 14.5 V17 L20 18" />
  </>,
);

export const IconPathroomRecoveryProgress = createOriginalIcon(
  "IconPathroomRecoveryProgress",
  <>
    <path d="M18 7 C16 4 12 3 8 5 C4 7 3 12 5 16 C7 20 12 21 16 19 C19 17 21 13 20 10" />
    <path d="M18 3 V7 H14" />
    <path d="M8 15 L11 12 L13 14 L17 10" />
  </>,
);
