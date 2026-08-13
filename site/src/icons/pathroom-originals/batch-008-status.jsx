import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomQueuedItem = createOriginalIcon(
  "IconPathroomQueuedItem",
  <>
    <path d="M8 6 H20 M8 12 H17 M8 18 H14" />
    <circle cx="4" cy="6" r="1" />
    <circle cx="4" cy="12" r="1" />
    <circle cx="4" cy="18" r="1" />
    <path d="M17 15 L20 18 L17 21" />
  </>,
);

export const IconPathroomProcessingStage = createOriginalIcon(
  "IconPathroomProcessingStage",
  <>
    <rect x="2" y="9" width="5" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <rect x="17" y="9" width="5" height="6" rx="1" />
    <path d="M7 12 H9 M15 12 H17" />
    <path d="M12 5 V7 M12 17 V19 M7 7 L9 9 M17 7 L15 9 M7 17 L9 15 M17 17 L15 15" />
  </>,
);

export const IconPathroomSyncConflict = createOriginalIcon(
  "IconPathroomSyncConflict",
  <>
    <path d="M4 8 C6 4 11 3 15 5 L18 7 M18 3 V7 H14" />
    <path d="M20 16 C18 20 13 21 9 19 L6 17 M6 21 V17 H10" />
    <path d="M9 9 L15 15 M15 9 L9 15" />
  </>,
);

export const IconPathroomNeedsAttention = createOriginalIcon(
  "IconPathroomNeedsAttention",
  <>
    <path d="M12 3 L22 20 H2 Z" />
    <path d="M12 9 V14" />
    <circle cx="12" cy="17" r="1" />
  </>,
);

export const IconPathroomEscalatedIssue = createOriginalIcon(
  "IconPathroomEscalatedIssue",
  <>
    <circle cx="7" cy="7" r="4" />
    <path d="M7 5 V7 M7 9 H7.1" />
    <path d="M4 20 L11 13 L15 17 L21 11 M16 11 H21 V16" />
  </>,
);

export const IconPathroomValidationFailed = createOriginalIcon(
  "IconPathroomValidationFailed",
  <>
    <rect x="4" y="4" width="13" height="17" rx="2" />
    <path d="M8 4 V3 H13 V4 M8 8 H13 M8 12 H12 M8 16 H10" />
    <circle cx="18" cy="17" r="4" />
    <path d="M16 15 L20 19 M20 15 L16 19" />
  </>,
);

export const IconPathroomDependencyWaiting = createOriginalIcon(
  "IconPathroomDependencyWaiting",
  <>
    <circle cx="4" cy="6" r="2" />
    <circle cx="4" cy="18" r="2" />
    <path d="M6 6 H10 M6 18 H10 M10 6 V18" />
    <path d="M14 5 H21 M14 19 H21 M15 5 C15 9 17 10 18 12 C17 14 15 15 15 19 M20 5 C20 9 18 10 17 12 C18 14 20 15 20 19" />
  </>,
);

export const IconPathroomArchivedState = createOriginalIcon(
  "IconPathroomArchivedState",
  <>
    <rect x="4" y="7" width="16" height="13" rx="1" />
    <path d="M3 3 H21 V7 H3 Z" />
    <path d="M9 11 H15" />
    <path d="M9 16 L11 18 L15 14" />
  </>,
);
