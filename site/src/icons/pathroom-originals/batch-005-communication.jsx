import React from "react";
import { createOriginalIcon } from "./createOriginalIcon.jsx";

export const IconPathroomTypingMessage = createOriginalIcon(
  "IconPathroomTypingMessage",
  <>
    <path d="M3 4 H21 V16 H12 L8 20 V16 H3 Z" />
    <circle cx="8" cy="10" r="1" />
    <circle cx="12" cy="10" r="1" />
    <circle cx="16" cy="10" r="1" />
  </>,
);

export const IconPathroomScheduledMessage = createOriginalIcon(
  "IconPathroomScheduledMessage",
  <>
    <path d="M3 4 H18 V14 H10 L6 18 V14 H3 Z" />
    <circle cx="17" cy="16" r="5" />
    <path d="M17 13 V16 L19 18" />
  </>,
);

export const IconPathroomReplyMessage = createOriginalIcon(
  "IconPathroomReplyMessage",
  <>
    <path d="M3 4 H21 V16 H12 L8 20 V16 H3 Z" />
    <path d="M14 8 H9 C6 8 5 10 5 13 M8 10 L5 13 L8 16" />
  </>,
);

export const IconPathroomAttachmentMessage = createOriginalIcon(
  "IconPathroomAttachmentMessage",
  <>
    <path d="M3 3 H21 V16 H13 L9 20 V16 H3 Z" />
    <path d="M9 11 L14 6 C15.5 4.5 18 7 16.5 8.5 L11.5 13.5 C10 15 7.5 12.5 9 11 L13 7" />
  </>,
);

export const IconPathroomMutedMessage = createOriginalIcon(
  "IconPathroomMutedMessage",
  <>
    <path d="M3 4 H21 V16 H12 L8 20 V16 H3 Z" />
    <path d="M7 11 H9 L12 8 V14 L10 13" />
    <path d="M5 5 L19 19" />
  </>,
);

export const IconPathroomBroadcastSignal = createOriginalIcon(
  "IconPathroomBroadcastSignal",
  <>
    <path d="M12 9 V21 M8 21 H16 M9 21 L12 9 L15 21" />
    <circle cx="12" cy="6" r="2" />
    <path d="M7 3 C4 5 4 9 7 11 M17 3 C20 5 20 9 17 11" />
    <path d="M4 2 C2 5 2 9 4 12 M20 2 C22 5 22 9 20 12" />
  </>,
);

export const IconPathroomVideoConference = createOriginalIcon(
  "IconPathroomVideoConference",
  <>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <circle cx="7" cy="9" r="2" />
    <circle cx="12" cy="8" r="2" />
    <circle cx="17" cy="9" r="2" />
    <path d="M3 17 C4 14 7 13 9 14 C10 12 14 12 15 14 C18 13 20 14 21 17" />
  </>,
);

export const IconPathroomPhoneTransfer = createOriginalIcon(
  "IconPathroomPhoneTransfer",
  <>
    <path d="M7 3 H4 C3 3 3 4 3 5 C4 13 11 20 19 21 C20 21 21 20 21 19 V16 L16 14 L14 17 C10 15 7 12 6 8 L9 6 Z" />
    <path d="M12 5 H20 M17 2 L20 5 L17 8" />
  </>,
);
