import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomWaveform = createOriginalIcon(
  "IconPathroomWaveform",
  <path d="M3 13 V11 M6 16 V8 M9 18 V6 M12 15 V9 M15 20 V4 M18 16 V8 M21 13 V11" />,
);

export const IconPathroomPodcast = createOriginalIcon(
  "IconPathroomPodcast",
  <>
    <circle cx="12" cy="9" r="2" />
    <path d="M9.5 21 L10.2 14.7 C10.4 13.1 11 12 12 12 C13 12 13.6 13.1 13.8 14.7 L14.5 21" />
    <path d="M7.5 15 C5.3 13.5 4 11.5 4 9 C4 4.6 7.6 2 12 2 C16.4 2 20 4.6 20 9 C20 11.5 18.7 13.5 16.5 15" />
  </>,
);

export const IconPathroomSubtitles = createOriginalIcon(
  "IconPathroomSubtitles",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="7" y1="10" x2="17" y2="10" />
    <line x1="7" y1="14" x2="14" y2="14" />
  </>,
);

export const IconPathroomPictureInPicture = createOriginalIcon(
  "IconPathroomPictureInPicture",
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <rect x="11" y="12" width="8" height="6" rx="1" />
  </>,
);

export const IconPathroomRepeat = createOriginalIcon(
  "IconPathroomRepeat",
  <>
    <path d="M5 9 C5 6 8 4 12 4 H18 L15 2 M18 4 L20 6 V9" />
    <path d="M19 15 C19 18 16 20 12 20 H6 L9 22 M6 20 L4 18 V15" />
  </>,
);

export const IconPathroomShuffle = createOriginalIcon(
  "IconPathroomShuffle",
  <path d="M4 7 H7 C10 7 14 17 17 17 H20 M4 17 H7 C10 17 14 7 17 7 H20 M17 4 L20 7 L17 10 M17 14 L20 17 L17 20" />,
);
