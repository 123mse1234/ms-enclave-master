"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion, useInView } from "framer-motion";

import "swiper/css";
import toast from "react-hot-toast";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";
import VideoHeroSection from "../Home/VideoHeroSection";
import VideoSection from "@/components/common/VideoSection";

/* ================= ANIMATIONS ================= */

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

/* ================= COMPONENT ================= */

export default function NearbyTouristPlacesVideo() {
  const { data: session, status } = useSession();

  /* 🔹 CONFETTI */
  const [showConfetti, setShowConfetti] = useState(false);

  /* 🔹 ANIMATION REFS */
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  const imageInView = useInView(imageRef, { amount: 0.3 });
  const formInView = useInView(formRef, { amount: 0.3 });
  const buttonInView = useInView(buttonRef, { amount: 0.3 });

  /* 🔹 FORM STATE */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* 🔹 AUTO-FILL FROM SESSION */
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
        phone: (session.user as any)?.phone || "",
      }));
    }
  }, [session, status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 text-gray-900 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]";

  /* 🔹 SUBMIT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        /* 🎉 CONFETTI */
        setShowConfetti(true);

        toast.success("Message submitted successfully!");

        setFormData({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          phone: (session?.user as any)?.phone || "",
          message: "",
        });
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        toast.error("Failed to submit message.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* 🎉 CONFETTI */}
      {showConfetti && <ConfettiOverlay show={showConfetti} />}

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-xs"
        style={{
          backgroundImage:
            "url(/images/activities/ms-enclave-palakkad-activity2.webp)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* LEFT IMAGE */}
          <motion.div
            ref={imageRef}
            variants={fadeLeft}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="relative h-[300px] md:h-[600px]"
          >
            <VideoSection
              videoSrc="/video/ms-enclave-heritage-resort-palakkad-nearby-attractions.mp4"
              fallbackImage="/images/common/ms-enclave-54.webp"
            />
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            ref={formRef}
            variants={fadeRight}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="bg-white p-8 rounded-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-center text-black">
              Nearby Attractions
            </h2>
            <p className="text-xl mt-3 font-semibold text-center text-gray-900 font-dm mb-2">
              Explore the Beauty Around M.S. Enclave
            </p>

            <p className="text-center text-gray-800 mt-2 mb-6 font-dm">
              Discover the natural landscapes, cultural landmarks, and peaceful
              village surroundings located just minutes from the resort. From
              scenic views to local experiences, every attraction adds charm to
              your stay.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
