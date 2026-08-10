import React from "react";

export function createOriginalIcon(displayName, geometry) {
  function OriginalIcon({ size = 24, stroke = 2, ...props }) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {geometry}
      </svg>
    );
  }

  OriginalIcon.displayName = displayName;
  return OriginalIcon;
}
