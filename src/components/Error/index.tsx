import React from "react";
import Link from "next/link";
import Image from "next/image";

const Error = () => {
  return (
    <>
      <section className="h-screen overflow-hidden py-10 bg-gray-2 bg-cover bg-center flex items-center" style={{ backgroundImage: "url('/images/common/ms-enclave-54.webp')" }}>
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div>
            <h1 className="text-white shadow-lg text-7xl text-center py-10">404</h1>
          <h2 className="text-white text-shadow-2xs text-5xl text-center">This Page is Not Fount</h2>
          <div className="flex justify-center">
            <Link href={"/"} className="my-10 bg-blue-600 rounded-sm px-3 py-2">Back to Homepage</Link>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
