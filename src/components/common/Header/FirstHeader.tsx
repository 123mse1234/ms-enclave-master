"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Contact } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function TopHeader() {
  return (
    <div className="w-full pt-4 px-4 theme-bg">
      <div className="grid  md:grid-cols-8 max-w-7xl mx-auto">
        {/* LEFT SECTION */}
        <div className="col-span-2 hidden md:flex justify-start items-center gap-3 text-sm">
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center ">
              <FontAwesomeIcon icon={faPhone} className="text-lg text-yellow-50" />
            </div>
            <div className="text-[14px] font-dm  text-yellow-50  ml-2">
              <p>
                <Link href="tel:+918589996642" className="hover:underline">
                  +91 974 566 6642
                </Link>
              </p>

              <p>
                <Link href="tel:+919945004857" className="hover:underline">
                  +91 994 500 4857
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* CENTER LOGO */}
        <div className="col-span-4 flex justify-center">
          <Link
            href={"/"}
            className="text-center w-full md:max-w-96 flex justify-center"
          >
            <div className="sr-only">
              <h1 className="hidden text-[28px] text-black tracking-widest  font-semibold uppercase">
                M.S. Enclave
              </h1>
              <p className="hidden text-[8px] uppercase  tracking-[0.25em] text-black">
                Heritage Resort
              </p>
            </div>

            <Image
              src="/ms-enclave-logo1.PNG"
              height={40}
              width={150}
              alt="ms-heritage-resort-palakkad-logo"
              className="drop-shadow-sm"
            />
            {/* <Image
  src="/ms-enclave-logo1.PNG"
  height={40}
  width={150}
  alt="ms-heritage-resort-palakkad-logo"
  className="drop-shadow-sm"
/> */}
          </Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-2 hidden md:flex justify-end items-center gap-3 text-right">
          <div className="flex justify-center">
            <div className="text-right text-[15px] font-dm">
              <Link
                href="https://maps.app.goo.gl/MvrRJ2aN9SZZsFHL7"
                target="_blank"
                className="text-yellow-50 mr-2 hover:underline"
              >
                Mannuparambil, Paruthipully <br /> Palakkad, Kerala
              </Link>{" "}
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-yellow-100">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-lg text-yellow-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
