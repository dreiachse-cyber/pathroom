import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomCodeFile = createOriginalIcon(
  "IconPathroomCodeFile",
  <>
    <path d="M4 3 H14 L20 9 V21 H4 Z M14 3 V9 H20" />
    <path d="M10 12 L8 14 L10 16 M14 12 L16 14 L14 16 M13 11 L11 17" />
  </>,
);

export const IconPathroomSpreadsheetFile = createOriginalIcon(
  "IconPathroomSpreadsheetFile",
  <>
    <path d="M5 3 H15 L19 7 V21 H5 Z M15 3 V7 H19" />
    <rect x="8" y="10" width="8" height="8" rx="1" />
    <path d="M12 10 V18 M8 14 H16" />
  </>,
);

export const IconPathroomDocumentStack = createOriginalIcon(
  "IconPathroomDocumentStack",
  <>
    <path d="M7 3 H17 L20 6 V19 H7 Z M17 3 V6 H20" />
    <path d="M7 6 H4 V22 H17 V19" />
  </>,
);

export const IconPathroomSharedFolder = createOriginalIcon(
  "IconPathroomSharedFolder",
  <>
    <path d="M3 7 H9 L11 9 H21 V20 H3 Z" />
    <circle cx="13" cy="13" r="1.5" />
    <circle cx="17.5" cy="12" r="1.5" />
    <circle cx="16" cy="17" r="1.5" />
    <path d="M14.5 12.7 L16 12.3 M14 14.2 L15.2 16" />
  </>,
);

export const IconPathroomSignedDocument = createOriginalIcon(
  "IconPathroomSignedDocument",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z M14 3 V8 H19" />
    <path d="M8 16 C9 12 10 12 11 15 C12 18 13 12 14 14 C15 16 16 16 17 14" />
    <line x1="8" y1="19" x2="17" y2="19" />
  </>,
);

export const IconPathroomDocumentScan = createOriginalIcon(
  "IconPathroomDocumentScan",
  <>
    <path d="M4 8 V4 H8 M16 4 H20 V8 M20 16 V20 H16 M8 20 H4 V16" />
    <rect x="7" y="6" width="10" height="12" rx="1" />
    <path d="M9 10 H15 M9 13 H15 M9 16 H13" />
  </>,
);

export const IconPathroomFavoriteFolder = createOriginalIcon(
  "IconPathroomFavoriteFolder",
  <>
    <path d="M3 7 H9 L11 9 H21 V20 H3 Z" />
    <polygon points="15 10 16.4 13 19.5 13.5 17.2 15.7 17.8 19 15 17.5 12.2 19 12.8 15.7 10.5 13.5 13.6 13" />
  </>,
);

export const IconPathroomProtectedFile = createOriginalIcon(
  "IconPathroomProtectedFile",
  <>
    <path d="M5 3 H14 L19 8 V11 M14 3 V8 H19 M5 3 V21 H10" />
    <path d="M15.5 11 L21 13 V16 C21 19 18.5 21 15.5 22 C12.5 21 10 19 10 16 V13 Z" />
    <path d="M13 16 L15 18 L18 14.5" />
  </>,
);
