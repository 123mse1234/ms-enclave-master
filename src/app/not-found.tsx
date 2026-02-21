import React from "react";
import Error from "@/components/Error";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Error Page | MS Enclave  ",
  description: "This is Error Page for MS Enclave ",
  // other metadata
};

export const NotFound = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default NotFound