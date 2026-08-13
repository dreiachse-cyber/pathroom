import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomNoiseCancellation = createOriginalIcon(
  "IconPathroomNoiseCancellation",
  <>
    <path d="M4 13 V10 C4 5 7 3 12 3 C17 3 20 5 20 10 V13" />
    <rect x="3" y="12" width="4" height="7" rx="2" />
    <rect x="17" y="12" width="4" height="7" rx="2" />
    <path d="M9 9 C11 7 13 7 15 9 M9 12 C11 10 13 10 15 12" />
    <path d="M10 16 L14 20 M14 16 L10 20" />
  </>,
);

export const IconPathroomVideoStabilization = createOriginalIcon(
  "IconPathroomVideoStabilization",
  <>
    <path d="M4 8 V4 H8 M16 4 H20 V8 M20 16 V20 H16 M8 20 H4 V16" />
    <rect x="7" y="8" width="10" height="8" rx="2" />
    <circle cx="12" cy="12" r="2" />
  </>,
);

export const IconPathroomColorGrading = createOriginalIcon(
  "IconPathroomColorGrading",
  <>
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="8" r="3" />
    <circle cx="12" cy="16" r="3" />
  </>,
);

export const IconPathroomChromaKey = createOriginalIcon(
  "IconPathroomChromaKey",
  <>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <circle cx="12" cy="9" r="2" />
    <path d="M8 17 C8 14 10 12 12 12 C14 12 16 14 16 17" />
    <path d="M4 6 H8 V10 H4 M16 12 H20 V16 H16" />
  </>,
);

export const IconPathroomVideoTransition = createOriginalIcon(
  "IconPathroomVideoTransition",
  <>
    <rect x="3" y="5" width="6" height="14" rx="2" />
    <rect x="15" y="5" width="6" height="14" rx="2" />
    <path d="M9 12 H15 M12 9 L15 12 L12 15" />
  </>,
);

export const IconPathroomKeyframeTimeline = createOriginalIcon(
  "IconPathroomKeyframeTimeline",
  <>
    <polyline points="4 13 9 8 14 12 20 5" />
    <polygon points="9 5 12 8 9 11 6 8" />
    <polygon points="14 9 17 12 14 15 11 12" />
    <polygon points="20 2 22 5 20 8 18 5" />
    <path d="M3 19 H21 M7 17 V21 M17 17 V21" />
  </>,
);

export const IconPathroomPhotoCrop = createOriginalIcon(
  "IconPathroomPhotoCrop",
  <>
    <path d="M7 3 V17 C7 19 8 20 10 20 H21" />
    <path d="M3 7 H17 C19 7 20 8 20 10 V21" />
    <circle cx="14" cy="10" r="1" />
    <path d="M10 17 L13 13 L16 16 L19 12" />
  </>,
);

export const IconPathroomAudioCrossfade = createOriginalIcon(
  "IconPathroomAudioCrossfade",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M4 7 C9 7 10 17 15 17 H20" />
    <path d="M4 17 C9 17 10 7 15 7 H20" />
  </>,
);
