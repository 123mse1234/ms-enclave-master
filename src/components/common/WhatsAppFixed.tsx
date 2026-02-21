"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function WhatsAppFixed() {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=919745666642&text=Hello%2C%20I%20would%20like%20to%20make%20an%20enquiry%20about%20your%20packages"
      target="_blank"
      className="
        fixed 
        bottom-5 
        right-15 
        md:right-5
        z-9999
        w-12 
        h-12 
        rounded-full 
        bg-green-700 
        text-white 
        text-xl 
        flex 
        items-center 
        justify-center 
        shadow-lg 
        hover:scale-110 
        transition
      "
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </Link>
  );
}
