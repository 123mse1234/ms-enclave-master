"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialMedia() {
  return (
    <div className="flex items-center space-x-5 justify-center mt-4">
      
      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        className="text-black hover:text-blue-800 text-md transition"
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        className="text-black hover:text-pink-800 text-md transition"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>

      {/* YouTube */}
      <a
        href="https://youtube.com"
        target="_blank"
        className="text-black hover:text-red-800 text-md transition"
      >
        <FontAwesomeIcon icon={faYoutube} />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/918589998642"
        target="_blank"
        className="text-black hover:text-green-800 text-md transition"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>

    </div>
  );
}
