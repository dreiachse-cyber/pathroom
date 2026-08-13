import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomPersonReading = createOriginalIcon(
  "IconPathroomPersonReading",
  <>
    <circle cx="12" cy="5" r="2.5" />
    <path d="M7 12 C8 10 10 9 12 9 C14 9 16 10 17 12" />
    <path d="M3 13 C6 12 9 13 12 16 C15 13 18 12 21 13 V20 C18 19 15 20 12 22 C9 20 6 19 3 20 Z" />
  </>,
);

export const IconPathroomPersonRunning = createOriginalIcon(
  "IconPathroomPersonRunning",
  <>
    <circle cx="15" cy="5" r="2.5" />
    <path d="M13 9 L10 13 L14 15 L18 12" />
    <path d="M10 13 L7 18 L3 20" />
    <path d="M14 15 L17 20 H21" />
    <path d="M12 10 L8 8 L5 11" />
  </>,
);

export const IconPathroomPersonCarryingBox = createOriginalIcon(
  "IconPathroomPersonCarryingBox",
  <>
    <circle cx="7" cy="5" r="2.5" />
    <path d="M5 9 C3 11 3 16 4 21 M9 9 C11 10 12 12 12 15" />
    <rect x="11" y="11" width="10" height="9" rx="2" />
    <path d="M6 14 H11 M6 21 H10" />
    <path d="M16 11 V20" />
  </>,
);

export const IconPathroomPersonCelebrating = createOriginalIcon(
  "IconPathroomPersonCelebrating",
  <>
    <circle cx="12" cy="7" r="2.5" />
    <path d="M9 12 L6 10 L3 6" />
    <path d="M15 12 L18 10 L21 6" />
    <path d="M9 12 C10 11 14 11 15 12 L14 16 H10 Z" />
    <path d="M10 16 L7 21 M14 16 L17 21" />
  </>,
);

export const IconPathroomParentAndChild = createOriginalIcon(
  "IconPathroomParentAndChild",
  <>
    <circle cx="8" cy="5" r="2.5" />
    <circle cx="17" cy="9" r="2" />
    <path d="M4 21 V14 C4 10 6 9 8 9 C10 9 12 11 12 14 V21" />
    <path d="M14 21 V15 C14 12 15 12 17 12 C19 12 20 14 20 17 V21" />
    <path d="M11 14 L15 15" />
  </>,
);

export const IconPathroomMedicalWorker = createOriginalIcon(
  "IconPathroomMedicalWorker",
  <>
    <circle cx="9" cy="6" r="2.5" />
    <path d="M4 21 V15 C4 11 6 10 9 10 C12 10 14 12 14 15 V21" />
    <rect x="14" y="8" width="8" height="8" rx="2" />
    <path d="M18 10 V14 M16 12 H20" />
    <path d="M8 15 V18 H11" />
  </>,
);

export const IconPathroomHardHatWorker = createOriginalIcon(
  "IconPathroomHardHatWorker",
  <>
    <path d="M5 8 C5 4 8 2 12 2 C16 2 19 4 19 8" />
    <path d="M4 8 H20" />
    <path d="M7 10 V11 C7 14 9 16 12 16 C15 16 17 14 17 11 V10" />
    <path d="M4 22 C4 18 7 16 12 16 C17 16 20 18 20 22" />
  </>,
);

export const IconPathroomWheelchairUser = createOriginalIcon(
  "IconPathroomWheelchairUser",
  <>
    <circle cx="9" cy="5" r="2.5" />
    <circle cx="8" cy="16" r="5" />
    <path d="M9 9 V14 H14 L18 20" />
    <path d="M14 14 H18 L21 18" />
  </>,
);
