import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomUTurnLeft = createOriginalIcon(
  "IconPathroomUTurnLeft",
  <>
    <path d="M19 21 V11 C19 7 16 4 12 4 H4" />
    <path d="M8 2 L4 4 L8 7" />
  </>,
);

export const IconPathroomUTurnRight = createOriginalIcon(
  "IconPathroomUTurnRight",
  <>
    <path d="M5 21 V11 C5 7 8 4 12 4 H20" />
    <path d="M16 2 L20 4 L16 7" />
  </>,
);

export const IconPathroomLaneChangeLeft = createOriginalIcon(
  "IconPathroomLaneChangeLeft",
  <>
    <line x1="16" y1="3" x2="16" y2="21" />
    <path d="M8 21 V12 C8 8 6 5 3 5" />
    <path d="M6 2 L3 5 L6 8" />
  </>,
);

export const IconPathroomLaneChangeRight = createOriginalIcon(
  "IconPathroomLaneChangeRight",
  <>
    <line x1="8" y1="3" x2="8" y2="21" />
    <path d="M16 21 V12 C16 8 18 5 21 5" />
    <path d="M18 2 L21 5 L18 8" />
  </>,
);

export const IconPathroomReorderUp = createOriginalIcon(
  "IconPathroomReorderUp",
  <>
    <path d="M10 5 H21 M10 12 H21 M10 19 H21" />
    <path d="M3 10 L6 7 L9 10" />
    <line x1="6" y1="7" x2="6" y2="18" />
  </>,
);

export const IconPathroomReorderDown = createOriginalIcon(
  "IconPathroomReorderDown",
  <>
    <path d="M10 5 H21 M10 12 H21 M10 19 H21" />
    <path d="M3 14 L6 17 L9 14" />
    <line x1="6" y1="6" x2="6" y2="17" />
  </>,
);

export const IconPathroomBringForward = createOriginalIcon(
  "IconPathroomBringForward",
  <>
    <path d="M3 14 L10 10 L17 14 L10 18 Z M3 18 L10 22 L17 18" />
    <path d="M19 17 V4 M16 7 L19 4 L22 7" />
  </>,
);

export const IconPathroomSendBackward = createOriginalIcon(
  "IconPathroomSendBackward",
  <>
    <path d="M3 6 L10 2 L17 6 L10 10 Z M3 10 L10 14 L17 10" />
    <path d="M19 7 V20 M16 17 L19 20 L22 17" />
  </>,
);
