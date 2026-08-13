import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomPlaybackSpeed = createOriginalIcon(
  "IconPathroomPlaybackSpeed",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3 V6 M6 5 L8 8 M18 5 L16 8" />
    <polygon points="10 9 16 12 10 15" />
  </>,
);

export const IconPathroomStoryboard = createOriginalIcon(
  "IconPathroomStoryboard",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10 H21 M10 4 V20" />
    <polygon points="13 12 18 15 13 18" />
  </>,
);

export const IconPathroomVideoChapters = createOriginalIcon(
  "IconPathroomVideoChapters",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="9" y1="4" x2="9" y2="20" />
    <circle cx="6" cy="8" r="1" />
    <circle cx="6" cy="12" r="1" />
    <circle cx="6" cy="16" r="1" />
    <polygon points="12 9 18 12 12 15" />
  </>,
);

export const IconPathroomCameraTimer = createOriginalIcon(
  "IconPathroomCameraTimer",
  <>
    <path d="M3 8 H7 L9 5 H15 L17 8 H21 V19 H3 Z" />
    <circle cx="11" cy="13" r="3" />
    <circle cx="18" cy="18" r="4" />
    <path d="M18 16 V18 L20 19" />
  </>,
);

export const IconPathroomPanoramaView = createOriginalIcon(
  "IconPathroomPanoramaView",
  <>
    <path d="M3 7 C8 5 16 5 21 7 V17 C16 19 8 19 3 17 Z" />
    <circle cx="17" cy="10" r="1.5" />
    <path d="M5 16 L9 11 L12 14 L15 12 L19 16" />
  </>,
);

export const IconPathroomMediaCast = createOriginalIcon(
  "IconPathroomMediaCast",
  <>
    <rect x="4" y="3" width="16" height="13" rx="2" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <path d="M3 16 C6 16 8 18 8 21 M3 19 C4 19 5 20 5 21" />
    <circle cx="3" cy="21" r="1" />
  </>,
);

export const IconPathroomAudiobook = createOriginalIcon(
  "IconPathroomAudiobook",
  <>
    <path d="M3 5 C6 4 9 5 12 7 C15 5 18 4 21 5 V18 C18 17 15 18 12 20 C9 18 6 17 3 18 Z M12 7 V20" />
    <polygon points="9 10 15 13 9 16" />
  </>,
);

export const IconPathroomClipMarker = createOriginalIcon(
  "IconPathroomClipMarker",
  <>
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 7 V17 M17 7 V17 M3 10 H7 M17 10 H21 M3 14 H7 M17 14 H21" />
    <path d="M12 4 V20 M9 4 H15 L12 8 Z" />
  </>,
);
