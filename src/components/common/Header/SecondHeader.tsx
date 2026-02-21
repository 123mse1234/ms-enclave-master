"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { menuData } from "./menu";
import LoginButton from "@/components/User/Profile/LoginButton";
import Sidebar from "../Sidebar";

export default function SecondHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  return (
    <header className="sticky top-0 w-full shadow-md theme-bg z-50 py-3 ">
      <div className="grid grid-cols-6 ">
        <div className="col-span-1 mt-[-100px] md:mt-0 flex justify-center items-center">
          <button
          onClick={() => setIsOpen(true)}
          className="text-4xl md:text-gray-50 text-yellow-500 md:text-3xl  hover:animate-bounce "
        >
          ☰
        </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex md:justify-center items-center col-span-4 space-x-8 text-yellow-50 font-dm font-medium text-sm relative">
          {menuData.map((item) => (
            <div key={item.id} className="group relative uppercase">
              {/* Main Link */}
              <Link
                href={item.path}
                target={item.newTab ? "_blank" : "_self"}
                className="hover:text-yellow-500"
              >
                {item.title} {item.submenu ? " ▾" : ""}
              </Link>

              {item.submenu && (
                <>
                  {/* FIX: Invisible hover buffer to fill mt-5 gap */}
                  <div className="absolute left-0 top-full w-full h-5"></div>

                  {/* Dropdown */}
                  <div
                    className="
              absolute left-0 top-full mt-5
              w-48 theme-bg shadow-lg rounded-lg
              hidden group-hover:flex flex-col
            "
                  >
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.path}
                        target={sub.newTab ? "_blank" : "_self"}
                        className="px-4 py-2 hover:bg-gray-100 hover:text-amber-600"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="col-span-1  hidden md:flex  justify-center items-center gap-4">
          {!session ? (
  <LoginButton />
) : (
  <div className="relative group">
    <button className="flex items-center focus:outline-none">
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border"
        />
      ) : (
        <User className="w-8 h-8 text-black" />
      )}
    </button>

    {/* Hover buffer wrapper (IMPORTANT FIX) */}
    <div className="absolute right-0 top-full w-44 pt-2 z-50">
      <div className="theme-bg shadow-lg font-dm text-yellow-50 font-medium uppercase text-sm rounded-lg overflow-hidden hidden group-hover:block">
        <div className="px-4 py-2 text-white font-bold text-shadow-md ">
          {session.user?.name}
        </div>

        <Link
          href="/profile"
          className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-600"
        >
          Profile
        </Link>

        <Link
          href="/my-bookings"
          className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-600"
        >
          Your Bookings
        </Link>

        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 uppercase hover:bg-gray-100 hover:text-amber-600"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <Sidebar isOpen={isOpen} menuData={menuData} onClose={() => setIsOpen(false)} />
    </header>
  );
}
