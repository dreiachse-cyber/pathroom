import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomDataGrid = createOriginalIcon(
  "IconPathroomDataGrid",
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 3 V21 M15 3 V21 M3 9 H21 M8 15 H21" />
  </>,
);

export const IconPathroomDataPipeline = createOriginalIcon(
  "IconPathroomDataPipeline",
  <>
    <circle cx="4" cy="18" r="2" />
    <circle cx="12" cy="6" r="2" />
    <circle cx="20" cy="18" r="2" />
    <path d="M6 18 C9 18 8 6 10 6" />
    <path d="M14 6 C16 6 15 18 18 18" />
  </>,
);

export const IconPathroomDataQuality = createOriginalIcon(
  "IconPathroomDataQuality",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="6" y1="8" x2="10" y2="8" />
    <circle cx="14" cy="13" r="4" />
    <path d="M12 13 L13.5 14.5 L16.5 11.5" />
  </>,
);

export const IconPathroomSchemaTree = createOriginalIcon(
  "IconPathroomSchemaTree",
  <>
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M12 7 V11 M5 11 H19 M5 11 V15 M12 11 V15 M19 11 V15" />
    <rect x="3" y="15" width="4" height="4" rx="1" />
    <rect x="10" y="15" width="4" height="4" rx="1" />
    <rect x="17" y="15" width="4" height="4" rx="1" />
  </>,
);

export const IconPathroomKeyedField = createOriginalIcon(
  "IconPathroomKeyedField",
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="6" y1="8" x2="13" y2="8" />
    <circle cx="8" cy="15" r="2" />
    <path d="M10 15 H18 M16 15 V17 M14 15 V17" />
  </>,
);

export const IconPathroomDataSnapshot = createOriginalIcon(
  "IconPathroomDataSnapshot",
  <>
    <rect x="6" y="3" width="15" height="14" rx="2" />
    <rect x="3" y="6" width="15" height="15" rx="2" />
    <circle cx="17" cy="17" r="4" />
    <path d="M17 14 V17 L19 18" />
  </>,
);

export const IconPathroomDataTransform = createOriginalIcon(
  "IconPathroomDataTransform",
  <>
    <path d="M3 6 H12 M3 10 H9.3 M3 14 H9.3 M3 18 H12" />
    <polygon points="12 6 16 12 12 18 8 12" />
    <path d="M13.3 8 H21 M16 12 H21 M13.3 16 H21" />
  </>,
);

export const IconPathroomDataStream = createOriginalIcon(
  "IconPathroomDataStream",
  <>
    <circle cx="21" cy="6" r="1" />
    <circle cx="21" cy="12" r="1" />
    <circle cx="21" cy="18" r="1" />
    <path d="M3 6 H8 L10 4 L12 8 L14 6 H20" />
    <path d="M3 12 H9 L11 9 L13 15 L15 12 H20" />
    <path d="M3 18 H7 L9 20 L11 16 L13 18 H20" />
  </>,
);
