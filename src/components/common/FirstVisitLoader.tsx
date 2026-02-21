"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";

export default function FirstVisitLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return true;

    try {
      const visited = sessionStorage.getItem("visited");
      return !visited;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!showLoader) return;

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem("visited", "true");
      } catch {}
      setShowLoader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showLoader]);

  if (showLoader) return <Preloader />;

  return <>{children}</>;
}