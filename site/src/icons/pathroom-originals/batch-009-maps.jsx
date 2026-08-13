import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomMapLegend = createOriginalIcon(
  "IconPathroomMapLegend",
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M6 17 L9 12 L6 7" />
    <circle cx="14" cy="8" r="1" />
    <circle cx="14" cy="16" r="1" />
    <path d="M17 8 H19 M17 16 H19" />
  </>,
);

export const IconPathroomOfflineMap = createOriginalIcon(
  "IconPathroomOfflineMap",
  <>
    <path d="M2 6 L6 3 L10 6 L14 3 V20 L10 22 L6 19 L2 22 Z" />
    <path d="M6 3 V19 M10 6 V22" />
    <path d="M19 4 V14 M16 11 L19 14 L22 11 M16 19 H22" />
  </>,
);

export const IconPathroomBikeRoute = createOriginalIcon(
  "IconPathroomBikeRoute",
  <>
    <circle cx="8" cy="17" r="3" />
    <circle cx="16" cy="17" r="3" />
    <path d="M8 17 L11 11 L14 17 H8 M11 11 H15 L16 17 M9 8 H13" />
    <path d="M3 6 C5 3 8 3 10 5 M15 6 C17 4 19 4 21 6" />
  </>,
);

export const IconPathroomParkingLocation = createOriginalIcon(
  "IconPathroomParkingLocation",
  <>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M9 17 V7 H13 C17 7 17 12 13 12 H9" />
    <path d="M4 16 H7 M17 8 H20" />
  </>,
);

export const IconPathroomCampsiteLocation = createOriginalIcon(
  "IconPathroomCampsiteLocation",
  <>
    <path d="M5 9 C5 5 8 2 12 2 C16 2 19 5 19 9 C19 14 12 21 12 21 C12 21 5 14 5 9 Z" />
    <path d="M8 11 L12 6 L16 11 Z M12 6 V11" />
  </>,
);

export const IconPathroomScenicViewpoint = createOriginalIcon(
  "IconPathroomScenicViewpoint",
  <>
    <circle cx="8" cy="11" r="4" />
    <circle cx="16" cy="11" r="4" />
    <path d="M11 9 C11 7 13 7 13 9 M4 11 L6 5 H10 L12 11 M20 11 L18 5 H14 L12 11" />
    <path d="M3 21 L8 16 L12 19 L16 15 L21 21" />
  </>,
);

export const IconPathroomRoadClosure = createOriginalIcon(
  "IconPathroomRoadClosure",
  <>
    <rect x="3" y="7" width="18" height="7" rx="1" />
    <path d="M5 8 L10 13 M11 8 L16 13 M17 8 L20 11" />
    <path d="M6 14 L4 21 M18 14 L20 21 M3 21 H8 M16 21 H21" />
  </>,
);

export const IconPathroomAirportRunway = createOriginalIcon(
  "IconPathroomAirportRunway",
  <>
    <path d="M10 3 H14 L18 21 H6 Z" />
    <path d="M12 5 V8 M12 11 V14 M12 17 V19 M9 18 H15 M10 6 H14" />
  </>,
);
