import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomDocumentCheck = createOriginalIcon(
  "IconPathroomDocumentCheck",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z" />
    <path d="M14 3 V8 H19 M8 15 L11 18 L16 13" />
  </>,
);

export const IconPathroomDocumentSearch = createOriginalIcon(
  "IconPathroomDocumentSearch",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z M14 3 V8 H19" />
    <circle cx="13" cy="14" r="3.5" />
    <line x1="15.5" y1="16.5" x2="19.5" y2="20.5" />
  </>,
);

export const IconPathroomFolderLock = createOriginalIcon(
  "IconPathroomFolderLock",
  <>
    <path d="M3 7 H9 L11 9 H21 V20 H3 Z" />
    <path d="M10 13 V11 C10 9 14 9 14 11 V13" />
    <rect x="8" y="13" width="8" height="6" rx="1" />
  </>,
);

export const IconPathroomInbox = createOriginalIcon(
  "IconPathroomInbox",
  <>
    <path d="M3 5 H21 V16 H16 L14 19 H10 L8 16 H3 Z" />
    <path d="M12 7 V13 M9 10 L12 13 L15 10" />
  </>,
);

export const IconPathroomPackage = createOriginalIcon(
  "IconPathroomPackage",
  <>
    <path d="M4 8 L12 4 L20 8 V18 L12 22 L4 18 Z" />
    <path d="M4 8 L12 12 L20 8 M12 12 V22" />
  </>,
);

export const IconPathroomCloudSync = createOriginalIcon(
  "IconPathroomCloudSync",
  <>
    <path d="M6 18 H18 C20 18 21 16 20 14 C20 11 18 9 15 10 C14 7 11 5 8 6 C5 6 3 8 4 11 C2 12 3 18 6 18" />
    <path d="M7 14 C8 12 10 11 12 11 H15 M15 11 L13 9 M15 11 L13 13 M17 14 C16 16 14 17 12 17 H9 M9 17 L11 15 M9 17 L11 19" />
  </>,
);
