"use client";

import Image from "next/image";
import { useSmoothTyping } from "@/hooks/useTypingEffect";
import PatternSectionForLoader from "./PatternSectionForLoader";

export default function Preloader() {
  const webAddress = useSmoothTyping("www.msheritageresort.com", 2000);
  return (
    <section className="fixed inset-0 z-9999 flex items-center justify-center theme-bg bg-white overflow-hidden">
      
      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center ">
        <Image
                      src="/ms-enclave-logo1.PNG"
                      height={40}
                      width={350}
                      alt="ms-heritage-resort-palakkad-logo"
                      className="drop-shadow-sm animate-fadeIn"
                    />
        <p className="theme-text text-xl mt-[-13px] tracking-wide font-light font-dm text-shadow-2xs">
          {webAddress}
        </p>
      </div>

      {/* Pattern Bottom Center */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-full">
        <PatternSectionForLoader className="h-40 w-full"  />
      </div>

    </section>
  );
}