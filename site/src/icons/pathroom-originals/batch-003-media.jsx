import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomVinylRecord = createOriginalIcon(
  "IconPathroomVinylRecord",
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="1" />
    <path d="M7 7 C9 5.5 11 5 13 5 M17 17 C15 18.5 13 19 11 19" />
  </>,
);

export const IconPathroomCassetteTape = createOriginalIcon(
  "IconPathroomCassetteTape",
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8" cy="11" r="2" />
    <circle cx="16" cy="11" r="2" />
    <path d="M8 11 H16 M6 18 L8 14 H16 L18 18 Z" />
  </>,
);

export const IconPathroomLiveStream = createOriginalIcon(
  "IconPathroomLiveStream",
  <>
    <rect x="5" y="6" width="14" height="12" rx="2" />
    <polygon points="10 9 15 12 10 15" />
    <path d="M4 8 C2.5 9 2 10.5 2 12 C2 13.5 2.5 15 4 16 M20 8 C21.5 9 22 10.5 22 12 C22 13.5 21.5 15 20 16" />
  </>,
);

export const IconPathroomScreenRecord = createOriginalIcon(
  "IconPathroomScreenRecord",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1.5" />
  </>,
);

export const IconPathroomAudioMixer = createOriginalIcon(
  "IconPathroomAudioMixer",
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 6 V9 M7 13 V18 M12 6 V13 M12 17 V18 M17 6 V8 M17 12 V18" />
    <rect x="5.5" y="9" width="3" height="4" rx="1" />
    <rect x="10.5" y="13" width="3" height="4" rx="1" />
    <rect x="15.5" y="8" width="3" height="4" rx="1" />
  </>,
);

export const IconPathroomVideoTrim = createOriginalIcon(
  "IconPathroomVideoTrim",
  <>
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 7 V17 M17 7 V17 M3 10 H7 M17 10 H21 M3 14 H7 M17 14 H21" />
    <path d="M10 4 V20 M14 4 V20" />
  </>,
);

export const IconPathroomSpatialAudio = createOriginalIcon(
  "IconPathroomSpatialAudio",
  <>
    <circle cx="12" cy="10" r="3" />
    <path d="M8 20 C8.5 16.5 10 15 12 15 C14 15 15.5 16.5 16 20" />
    <path d="M7 6 C5 7.5 4 9.5 4 12 C4 14.5 5 16.5 7 18 M17 6 C19 7.5 20 9.5 20 12 C20 14.5 19 16.5 17 18" />
    <path d="M5 4 C2.5 6 2 9 2 12 C2 15 2.5 18 5 20 M19 4 C21.5 6 22 9 22 12 C22 15 21.5 18 19 20" />
  </>,
);

export const IconPathroomLyricsPanel = createOriginalIcon(
  "IconPathroomLyricsPanel",
  <>
    <path d="M15 4 V14 C15 17 11 17 11 14 C11 11 15 11 15 14 M15 4 L20 3 V8" />
    <path d="M4 7 H10 M4 11 H8 M4 15 H8 M4 19 H13" />
  </>,
);
