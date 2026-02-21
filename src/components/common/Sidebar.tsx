"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

/* =========================
   TYPES
========================= */

interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

interface MenuItem {
  id: number;
  title: string;
  path?: string;
  submenu?: SubMenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuItem[];
}

/* =========================
   COMPONENT
========================= */

export default function Sidebar({
  isOpen,
  onClose,
  menuData,
}: SidebarProps) {
  const [roomsOpen, setRoomsOpen] = useState<number | null>(null);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="font-dm theme-bg">
          {/* Overlay */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black backdrop-blur-sm z-40"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed top-0 left-0 h-full w-80 theme-bg backdrop-blur-xl border-r border-white/20 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <h2 className="text-xl font-semibold text-white">Menu</h2>
              <button
                onClick={onClose}
                className="text-2xl text-white hover:rotate-90 transition duration-300"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <motion.nav
              className="flex flex-col p-6 space-y-4 text-white"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {menuData.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {item.submenu ? (
                    <>
                      {/* Parent Button */}
                      <button
                        onClick={() =>
                          setRoomsOpen(
                            roomsOpen === item.id ? null : item.id
                          )
                        }
                        className="w-full text-left flex justify-between items-center hover:text-yellow-300 transition"
                      >
                        {item.title}
                        <span
                          className={`transition-transform ${
                            roomsOpen === item.id ? "rotate-180" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      {/* Submenu */}
                      <AnimatePresence>
                        {roomsOpen === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 flex flex-col space-y-2 overflow-hidden"
                          >
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.id}
                                href={sub.path}
                                onClick={onClose}
                                className="text-sm hover:text-yellow-300 transition"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.path || "#"}
                      onClick={onClose}
                      className="hover:text-yellow-300 transition"
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}