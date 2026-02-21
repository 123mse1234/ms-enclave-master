"use client";

import { Bars } from "react-loader-spinner";


export default function Loader() {

  return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <Bars height="70" width="70" color="#fff" />
        <p className="text-white font-medium text-lg leading-relaxed font-dm text-shadow-lg ">
          Please wait, loading...
        </p>
      </div>
    );
}
