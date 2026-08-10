import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomMoveAll = createOriginalIcon(
  "IconPathroomMoveAll",
  <>
    <path d="M12 4 V20 M4 12 H20 M12 4 L9 7 M12 4 L15 7 M12 20 L9 17 M12 20 L15 17 M4 12 L7 9 M4 12 L7 15 M20 12 L17 9 M20 12 L17 15" />
    <circle cx="12" cy="12" r="3" />
  </>,
);

export const IconPathroomTurnLeft = createOriginalIcon(
  "IconPathroomTurnLeft",
  <>
    <path d="M20 20 V12 C20 8.7 17.3 6 14 6 H4" />
    <path d="M8 2 L4 6 L8 10" />
  </>,
);

export const IconPathroomTurnRight = createOriginalIcon(
  "IconPathroomTurnRight",
  <>
    <path d="M4 20 V12 C4 8.7 6.7 6 10 6 H20" />
    <path d="M16 2 L20 6 L16 10" />
  </>,
);

export const IconPathroomRoute = createOriginalIcon(
  "IconPathroomRoute",
  <>
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="6" r="2" />
    <path d="M5 16 C5 12 9 12 12 12 C15 12 15 6 17 6" />
  </>,
);

export const IconPathroomBranch = createOriginalIcon(
  "IconPathroomBranch",
  <>
    <circle cx="5" cy="12" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M7 12 H10 C13 12 13 6 17 6 M10 12 C13 12 13 18 17 18" />
  </>,
);

export const IconPathroomMerge = createOriginalIcon(
  "IconPathroomMerge",
  <>
    <circle cx="5" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="12" r="2" />
    <path d="M7 6 H10 C13 6 13 12 17 12 M7 18 C13 18 13 12 17 12" />
  </>,
);
