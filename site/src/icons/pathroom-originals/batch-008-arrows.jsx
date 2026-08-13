import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomJumpToStart = createOriginalIcon(
  "IconPathroomJumpToStart",
  <>
    <line x1="4" y1="4" x2="4" y2="20" />
    <path d="M20 12 H7 M11 8 L7 12 L11 16" />
  </>,
);

export const IconPathroomJumpToEnd = createOriginalIcon(
  "IconPathroomJumpToEnd",
  <>
    <line x1="20" y1="4" x2="20" y2="20" />
    <path d="M4 12 H17 M13 8 L17 12 L13 16" />
  </>,
);

export const IconPathroomSpreadVertical = createOriginalIcon(
  "IconPathroomSpreadVertical",
  <>
    <line x1="4" y1="3" x2="20" y2="3" />
    <line x1="4" y1="21" x2="20" y2="21" />
    <path d="M12 12 V4 M8 8 L12 4 L16 8 M12 12 V20 M8 16 L12 20 L16 16" />
  </>,
);

export const IconPathroomCompressHorizontal = createOriginalIcon(
  "IconPathroomCompressHorizontal",
  <>
    <line x1="3" y1="4" x2="3" y2="20" />
    <line x1="21" y1="4" x2="21" y2="20" />
    <path d="M4 12 H11 M7 8 L11 12 L7 16 M20 12 H13 M17 8 L13 12 L17 16" />
  </>,
);

export const IconPathroomForkLeft = createOriginalIcon(
  "IconPathroomForkLeft",
  <>
    <path d="M12 21 V5 M8 9 L12 5 L16 9" />
    <path d="M12 15 C8 15 6 12 6 8 M3 11 L6 8 L9 11" />
  </>,
);

export const IconPathroomForkRight = createOriginalIcon(
  "IconPathroomForkRight",
  <>
    <path d="M12 21 V5 M8 9 L12 5 L16 9" />
    <path d="M12 15 C16 15 18 12 18 8 M15 11 L18 8 L21 11" />
  </>,
);

export const IconPathroomZigzagRise = createOriginalIcon(
  "IconPathroomZigzagRise",
  <>
    <path d="M3 18 L8 13 L12 16 L20 7" />
    <path d="M16 7 H20 V11" />
  </>,
);

export const IconPathroomZigzagFall = createOriginalIcon(
  "IconPathroomZigzagFall",
  <>
    <path d="M3 6 L8 11 L12 8 L20 17" />
    <path d="M16 17 H20 V13" />
  </>,
);
