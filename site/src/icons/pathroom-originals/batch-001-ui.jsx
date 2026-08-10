import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomSparkles = createOriginalIcon(
  "IconPathroomSparkles",
  <>
    <path d="M12 3 L13.7 9.3 L20 11 L13.7 12.7 L12 19 L10.3 12.7 L4 11 L10.3 9.3 Z" />
    <path d="M19 4 L19.7 6.3 L22 7 L19.7 7.7 L19 10 L18.3 7.7 L16 7 L18.3 6.3 Z" />
    <path d="M5 16 L5.6 18.4 L8 19 L5.6 19.6 L5 22 L4.4 19.6 L2 19 L4.4 18.4 Z" />
  </>,
);

export const IconPathroomLayers = createOriginalIcon(
  "IconPathroomLayers",
  <>
    <path d="M4 7 L12 3 L20 7 L12 11 Z" />
    <path d="M4 12 L12 16 L20 12" />
    <path d="M4 17 L12 21 L20 17" />
  </>,
);

export const IconPathroomDragHandle = createOriginalIcon(
  "IconPathroomDragHandle",
  <>
    <circle cx="8" cy="7" r="1" />
    <circle cx="16" cy="7" r="1" />
    <circle cx="8" cy="12" r="1" />
    <circle cx="16" cy="12" r="1" />
    <circle cx="8" cy="17" r="1" />
    <circle cx="16" cy="17" r="1" />
  </>,
);

export const IconPathroomCommandKey = createOriginalIcon(
  "IconPathroomCommandKey",
  <>
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 9 H6.5 C5.1 9 4 7.9 4 6.5 S5.1 4 6.5 4 S9 5.1 9 6.5 V9" />
    <path d="M15 9 V6.5 C15 5.1 16.1 4 17.5 4 S20 5.1 20 6.5 S18.9 9 17.5 9 H15" />
    <path d="M15 15 H17.5 C18.9 15 20 16.1 20 17.5 S18.9 20 17.5 20 S15 18.9 15 17.5 V15" />
    <path d="M9 15 V17.5 C9 18.9 7.9 20 6.5 20 S4 18.9 4 17.5 S5.1 15 6.5 15 H9" />
  </>,
);

export const IconPathroomContrast = createOriginalIcon(
  "IconPathroomContrast",
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4 V20" />
  </>,
);

export const IconPathroomFocusFrame = createOriginalIcon(
  "IconPathroomFocusFrame",
  <>
    <path d="M9 4 H4 V9" />
    <path d="M15 4 H20 V9" />
    <path d="M4 15 V20 H9" />
    <path d="M20 15 V20 H15" />
  </>,
);
