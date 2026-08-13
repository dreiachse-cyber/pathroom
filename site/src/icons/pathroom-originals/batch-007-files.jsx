import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomDocumentTemplate = createOriginalIcon(
  "IconPathroomDocumentTemplate",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z M14 3 V8 H19" />
    <rect x="8" y="11" width="3" height="3" rx="1" />
    <path d="M13 11 H16 M13 14 H16 M8 17 H16" />
  </>,
);

export const IconPathroomFolderTree = createOriginalIcon(
  "IconPathroomFolderTree",
  <>
    <path d="M3 7 H9 L11 9 H21 V20 H3 Z" />
    <circle cx="8" cy="12" r="1" />
    <circle cx="15" cy="15" r="1" />
    <circle cx="18" cy="18" r="1" />
    <path d="M9 12 H12 V15 H14 M12 15 V18 H17" />
  </>,
);

export const IconPathroomFileRestore = createOriginalIcon(
  "IconPathroomFileRestore",
  <>
    <path d="M5 3 H14 L19 8 V12 M14 3 V8 H19 M5 3 V21 H11" />
    <path d="M11 14 H8 V11" />
    <path d="M8 14 C9 11 12 10 15 11 C18 12 20 15 19 18 C18 21 14 22 11 20" />
  </>,
);

export const IconPathroomFolderTransfer = createOriginalIcon(
  "IconPathroomFolderTransfer",
  <>
    <path d="M3 7 H9 L11 9 H21 V20 H3 Z" />
    <path d="M9 14 H18 M15 11 L18 14 L15 17" />
  </>,
);

export const IconPathroomBrokenFile = createOriginalIcon(
  "IconPathroomBrokenFile",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z M14 3 V8 H19" />
    <path d="M12 10 L9 14 L13 15 L10 20" />
  </>,
);

export const IconPathroomBookmarkedDocument = createOriginalIcon(
  "IconPathroomBookmarkedDocument",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z M14 3 V8 H19" />
    <path d="M9 11 V18 L12 16 L15 18 V11 Z" />
  </>,
);

export const IconPathroomBinaryFile = createOriginalIcon(
  "IconPathroomBinaryFile",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z M14 3 V8 H19" />
    <circle cx="9.5" cy="15" r="2" />
    <line x1="14.5" y1="12.5" x2="14.5" y2="17.5" />
  </>,
);

export const IconPathroomFolderStack = createOriginalIcon(
  "IconPathroomFolderStack",
  <>
    <path d="M5 5 H10 L12 7 H20 V18 H5 Z" />
    <path d="M5 8 H3 V21 H18 V18" />
  </>,
);
