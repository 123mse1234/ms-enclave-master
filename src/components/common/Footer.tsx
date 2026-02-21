"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faXTwitter,
  faWhatsapp,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      {/* ================= MAIN FOOTER ================= */}
      <div className="theme-bg text-yellow-100 rounded-t-3xl">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 lg:flex lg:justify-between">

          {/* BRAND */}
          <div className="md:col-span-1 col-span-4 flex justify-center">
            <div>
              <div className="flex justify-baseline">
              <Image
                        src="/ms-enclave-logo.png"
                        alt="M.S. Enclave Heritage Resort  Palakkad Resort Logo"
                        width={200}
                        height={60}
                      />
            </div>
            <div className="flex gap-4 mt-6">
              <Social icon={faGoogle} href={'https://share.google/bNocpD9oCYBNHBtsD'} />
              <Social icon={faInstagram} href={'https://www.instagram.com/ms_enclaveheritageresort?igsh=cnI4NTdhMTFtcmp3'} />
              <Social icon={faYoutube} href={'https://youtu.be/va9W1NfJ4D4?si=fNHIGIwiklFDz9Sn'} />
              <Social icon={faWhatsapp} href={'https://api.whatsapp.com/send?phone=+919745666642&text=Hello%2C%20I%20would%20like%20to%20make%20an%20enquiry%20about%20your%20packages'} />
            </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-1 col-span-4 flex justify-center">
            <div>
              <h4 className="font-semibold text-xl mb-4 ">Quick Links</h4>
            <ul className="space-y-3 text-gray-100  text- font-dm">
              <li className="hover:font-bold hover:text-white"><Link href="/">Home</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="/packages">Packages</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="/amenities/rooms">Rooms</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="/contact">Contact</Link></li>
            </ul>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-1 col-span-4 flex justify-center">
            <div>
              <h4 className="font-semibold text-xl mb-4">Quick Links</h4>
                <ul className="space-y-3 text-gray-100  text- font-dm">
                  <li className="hover:font-bold hover:text-white"><Link href="/">My Profile</Link></li>
                  <li className="hover:font-bold hover:text-white"><Link href="/my-booking">My Bookings</Link></li>
                  <li className="hover:font-bold hover:text-white"><Link href="/about-us">About US</Link></li>
                  <li className="hover:font-bold hover:text-white"><Link href="/amenities">Amenities</Link></li>
                </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-1 col-span-4 flex justify-center">
            <div>
              <h4 className="font-semibold text-xl mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-100  text- font-dm">
                  <li><Link href={'https://maps.app.goo.gl/MvrRJ2aN9SZZsFHL7'} className="text-gray-100 hover:font-bold hover:text-white text- leading-relaxed font-dm">
                Mannuparambil, Paruthipully<br />
                Palakkad, Kerala – 678573
              </Link></li>
              <li><Link href={'tel:+91 97456 66642'} className="text-gray-100 hover:font-bold hover:text-white text- mt-3 font-dm">
                +91 97456 66642
              </Link></li>
              <li><Link href={'mailto:msenclaveresort@gmail.com'} className="text-gray-100 hover:font-bold hover:text-white text- font-dm">
                msenclaveresort@gmail.com
              </Link></li>
              </ul>
            </div>
            
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-red-950 py-6 text-center text-white font-dm text-sm">
          © {new Date().getFullYear()} M.S Enclave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ================= SOCIAL ICON ================= */

function Social({ icon, href }: { icon: any, href:string  }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full border border-none flex items-center justify-center hover:bg-white hover:text-black transition"
    >
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
}
