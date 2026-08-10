export {
  IconPathroomCommandKey,
  IconPathroomContrast,
  IconPathroomDragHandle,
  IconPathroomFocusFrame,
  IconPathroomLayers,
  IconPathroomSparkles,
} from "./batch-001-ui.jsx";
export {
  IconPathroomBranch,
  IconPathroomMerge,
  IconPathroomMoveAll,
  IconPathroomRoute,
  IconPathroomTurnLeft,
  IconPathroomTurnRight,
} from "./batch-001-arrows.jsx";
export {
  IconPathroomCloudSync,
  IconPathroomDocumentCheck,
  IconPathroomDocumentSearch,
  IconPathroomFolderLock,
  IconPathroomInbox,
  IconPathroomPackage,
} from "./batch-001-files.jsx";
export {
  IconPathroomPictureInPicture,
  IconPathroomPodcast,
  IconPathroomRepeat,
  IconPathroomShuffle,
  IconPathroomSubtitles,
  IconPathroomWaveform,
} from "./batch-001-media.jsx";
export * from "./batch-002-commerce.jsx";
export * from "./batch-002-communication.jsx";
export * from "./batch-002-data.jsx";
export * from "./batch-002-devices.jsx";
export * from "./batch-003-ui.jsx";
export * from "./batch-003-arrows.jsx";
export * from "./batch-003-files.jsx";
export * from "./batch-003-media.jsx";

import {
  IconPathroomCommandKey,
  IconPathroomContrast,
  IconPathroomDragHandle,
  IconPathroomFocusFrame,
  IconPathroomLayers,
  IconPathroomSparkles,
} from "./batch-001-ui.jsx";
import {
  IconPathroomBranch,
  IconPathroomMerge,
  IconPathroomMoveAll,
  IconPathroomRoute,
  IconPathroomTurnLeft,
  IconPathroomTurnRight,
} from "./batch-001-arrows.jsx";
import {
  IconPathroomCloudSync,
  IconPathroomDocumentCheck,
  IconPathroomDocumentSearch,
  IconPathroomFolderLock,
  IconPathroomInbox,
  IconPathroomPackage,
} from "./batch-001-files.jsx";
import {
  IconPathroomPictureInPicture,
  IconPathroomPodcast,
  IconPathroomRepeat,
  IconPathroomShuffle,
  IconPathroomSubtitles,
  IconPathroomWaveform,
} from "./batch-001-media.jsx";
import { batch002Icons } from "./batch-002-registry.js";
import { batch003Icons } from "./batch-003-registry.js";

export const pathroomOriginalIcons = Object.freeze({
  sparkles: IconPathroomSparkles,
  layers: IconPathroomLayers,
  "drag-handle": IconPathroomDragHandle,
  "command-key": IconPathroomCommandKey,
  contrast: IconPathroomContrast,
  "focus-frame": IconPathroomFocusFrame,
  "move-all": IconPathroomMoveAll,
  "turn-left": IconPathroomTurnLeft,
  "turn-right": IconPathroomTurnRight,
  route: IconPathroomRoute,
  branch: IconPathroomBranch,
  merge: IconPathroomMerge,
  "document-check": IconPathroomDocumentCheck,
  "document-search": IconPathroomDocumentSearch,
  "folder-lock": IconPathroomFolderLock,
  inbox: IconPathroomInbox,
  package: IconPathroomPackage,
  "cloud-sync": IconPathroomCloudSync,
  waveform: IconPathroomWaveform,
  podcast: IconPathroomPodcast,
  subtitles: IconPathroomSubtitles,
  "picture-in-picture": IconPathroomPictureInPicture,
  repeat: IconPathroomRepeat,
  shuffle: IconPathroomShuffle,
  ...batch002Icons,
  ...batch003Icons,
});
