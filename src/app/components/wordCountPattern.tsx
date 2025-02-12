import React from "react";

export default function WordCountPattern({ className }: { className: string }) {
  return (
    <svg
      width="100"
      height="130"
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.666504 -10H50.6665V40H0.666504V-10ZM100.666 40H50.6665V89.9997H0.666504V140H50.6665V89.9997H100.666V140H150.667V89.9997H100.666V40ZM100.666 40H150.667V-10H100.666V40Z"
        fill="#FFB844"
      />
    </svg>
  );
}
