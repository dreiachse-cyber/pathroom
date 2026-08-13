import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomDataWarehouse = createOriginalIcon(
  "IconPathroomDataWarehouse",
  <>
    <path d="M3 9 L12 3 L21 9 V20 H3 Z" />
    <path d="M7 11 C7 8 17 8 17 11 V17 C17 20 7 20 7 17 Z" />
    <path d="M7 11 C7 14 17 14 17 11 M7 15 C7 18 17 18 17 15" />
  </>,
);

export const IconPathroomDataPartition = createOriginalIcon(
  "IconPathroomDataPartition",
  <>
    <path d="M4 6 C4 3 20 3 20 6 V18 C20 21 4 21 4 18 Z" />
    <path d="M4 6 C4 9 20 9 20 6 M4 12 C4 15 20 15 20 12" />
    <path d="M12 9 V21" />
  </>,
);

export const IconPathroomDataAggregation = createOriginalIcon(
  "IconPathroomDataAggregation",
  <>
    <path d="M10 4 H3 L8 12 L3 20 H10" />
    <rect x="13" y="14" width="2" height="6" rx="1" />
    <rect x="16" y="10" width="2" height="10" rx="1" />
    <rect x="19" y="6" width="2" height="14" rx="1" />
  </>,
);

export const IconPathroomMissingValue = createOriginalIcon(
  "IconPathroomMissingValue",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9 H21 M3 14 H13 M13 4 V20" />
    <path d="M16 9 C16 7 20 7 20 10 C20 12 18 12 18 14" />
    <circle cx="18" cy="17" r="1" />
  </>,
);

export const IconPathroomDataRetention = createOriginalIcon(
  "IconPathroomDataRetention",
  <>
    <path d="M3 6 C3 3 13 3 13 6 V18 C13 21 3 21 3 18 Z" />
    <path d="M3 6 C3 9 13 9 13 6 M3 12 C3 15 13 15 13 12" />
    <path d="M16 4 H21 M16 20 H21 M16 4 L21 10 L16 14 L21 20" />
  </>,
);

export const IconPathroomDatasetImport = createOriginalIcon(
  "IconPathroomDatasetImport",
  <>
    <path d="M11 6 C11 3 21 3 21 6 V18 C21 21 11 21 11 18 Z" />
    <path d="M11 6 C11 9 21 9 21 6 M11 13 C11 16 21 16 21 13" />
    <path d="M2 12 H12 M8 8 L12 12 L8 16" />
  </>,
);

export const IconPathroomDatasetExport = createOriginalIcon(
  "IconPathroomDatasetExport",
  <>
    <path d="M3 6 C3 3 13 3 13 6 V18 C13 21 3 21 3 18 Z" />
    <path d="M3 6 C3 9 13 9 13 6 M3 13 C3 16 13 16 13 13" />
    <path d="M12 12 H22 M18 8 L22 12 L18 16" />
  </>,
);

export const IconPathroomDataCompression = createOriginalIcon(
  "IconPathroomDataCompression",
  <>
    <rect x="8" y="4" width="8" height="16" rx="2" />
    <path d="M2 8 H6 M4 6 L6 8 L4 10" />
    <path d="M22 16 H18 M20 14 L18 16 L20 18" />
    <path d="M10 9 H14 M10 15 H14" />
  </>,
);
