import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomFileMetadata = createOriginalIcon(
  "IconPathroomFileMetadata",
  <>
    <path d="M4 3 H13 L17 7 V21 H4 Z M13 3 V7 H17" />
    <circle cx="15" cy="15" r="4" />
    <path d="M15 14 V17" />
    <circle cx="15" cy="12" r="0.5" />
  </>,
);

export const IconPathroomDocumentAnnotation = createOriginalIcon(
  "IconPathroomDocumentAnnotation",
  <>
    <path d="M3 3 H12 L16 7 V15 H3 Z M12 3 V7 H16" />
    <path d="M9 12 H21 V19 H16 L13 22 V19 H9 Z" />
    <path d="M12 15 H18 M12 17 H16" />
  </>,
);

export const IconPathroomFolderRules = createOriginalIcon(
  "IconPathroomFolderRules",
  <>
    <path d="M3 7 H9 L11 9 H21 V20 H3 Z" />
    <path d="M7 13 H17 M7 17 H17" />
    <circle cx="10" cy="13" r="1" />
    <circle cx="14" cy="17" r="1" />
  </>,
);

export const IconPathroomFileChecksum = createOriginalIcon(
  "IconPathroomFileChecksum",
  <>
    <path d="M5 3 H14 L19 8 V21 H5 Z M14 3 V8 H19" />
    <path d="M10 11 V18 M15 11 V18 M8 13 H17 M8 16 H17" />
  </>,
);

export const IconPathroomDocumentSplit = createOriginalIcon(
  "IconPathroomDocumentSplit",
  <>
    <path d="M4 3 H20 V21 H4 Z M12 3 V21" />
    <path d="M9 9 L6 12 L9 15 M15 9 L18 12 L15 15" />
  </>,
);

export const IconPathroomLinkedDocuments = createOriginalIcon(
  "IconPathroomLinkedDocuments",
  <>
    <path d="M3 4 H11 V18 H3 Z" />
    <path d="M13 6 H21 V20 H13 Z" />
    <path d="M10 10 H8 C5 10 5 14 8 14 H10 M14 10 H16 C19 10 19 14 16 14 H14 M9 12 H15" />
  </>,
);

export const IconPathroomFileOwner = createOriginalIcon(
  "IconPathroomFileOwner",
  <>
    <path d="M4 3 H13 L17 7 V11 H4 Z M13 3 V7 H17" />
    <circle cx="16" cy="14" r="3" />
    <path d="M10 21 C10 18 12 17 16 17 C20 17 22 18 22 21" />
  </>,
);

export const IconPathroomWatchedFolder = createOriginalIcon(
  "IconPathroomWatchedFolder",
  <>
    <path d="M3 7 H9 L11 9 H21 V20 H3 Z" />
    <ellipse cx="14" cy="14" rx="6" ry="4" />
    <circle cx="14" cy="14" r="1.5" />
  </>,
);
