"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function ReloadButton({
  label = "Reload Page",
}: {
  label?: string;
}) {
  return (
    <button
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 px-4 py-2  text-black  hover:text-blue-700 transition"
    >
      <FontAwesomeIcon icon={faRotateRight} />
    </button>
  );
}
