import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomDraftItem = createOriginalIcon(
  "IconPathroomDraftItem",
  <>
    <path d="M4 3 H14 L20 9 V21 H4 Z" />
    <path d="M14 3 V9 H20" />
    <path d="M7 17 L14 10 L17 13 L10 20 H7 Z" />
  </>,
);

export const IconPathroomUnderReview = createOriginalIcon(
  "IconPathroomUnderReview",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M6 12 C8 8 10 7 12 7 C15 7 18 9 19 12 C17 16 14 17 12 17 C9 17 7 15 6 12 Z" />
    <circle cx="12" cy="12" r="2" />
  </>,
);

export const IconPathroomApprovalGranted = createOriginalIcon(
  "IconPathroomApprovalGranted",
  <>
    <path d="M9 10 V6 C9 3 15 3 15 6 V10" />
    <rect x="4" y="10" width="16" height="12" rx="2" />
    <path d="M7 16 L11 20 L17 13" />
  </>,
);

export const IconPathroomApprovalDenied = createOriginalIcon(
  "IconPathroomApprovalDenied",
  <>
    <path d="M9 10 V6 C9 3 15 3 15 6 V10" />
    <rect x="4" y="10" width="16" height="12" rx="2" />
    <path d="M7 13 L17 20 M17 13 L7 20" />
  </>,
);

export const IconPathroomWorkflowPaused = createOriginalIcon(
  "IconPathroomWorkflowPaused",
  <>
    <path d="M12 2 L22 12 L12 22 L2 12 Z" />
    <path d="M9 8 V16 M15 8 V16" />
  </>,
);

export const IconPathroomCancelledItem = createOriginalIcon(
  "IconPathroomCancelledItem",
  <>
    <path d="M4 22 V3 H17 L20 7 L17 11 H4" />
    <path d="M9 15 L15 21 M15 15 L9 21" />
  </>,
);

export const IconPathroomAccessExpired = createOriginalIcon(
  "IconPathroomAccessExpired",
  <>
    <circle cx="8" cy="8" r="5" />
    <path d="M8 5 V8 L11 10" />
    <path d="M12 12 L20 20 M17 20 H20 V17" />
  </>,
);

export const IconPathroomVerifiedRelease = createOriginalIcon(
  "IconPathroomVerifiedRelease",
  <>
    <path d="M12 2 L20 6 V14 L12 22 L4 14 V6 Z" />
    <path d="M8 12 L11 15 L17 9" />
  </>,
);
