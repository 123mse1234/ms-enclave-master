"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion, useInView } from "framer-motion";

import "swiper/css";
import toast from "react-hot-toast";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";

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

export default function ContactFormSection() {
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
      {showConfetti && (
  <ConfettiOverlay show={showConfetti} />


)}


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
            <Image
              src="/images/activities/ms-enclave-palakkad-activity2.webp"
              alt="Ms Enclave Heritages Resort Palakkad Contact"
              fill
              className="object-cover"
              priority
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
              Send us a Message
            </h2>

            <p className="text-center text-gray-800 mt-2 mb-6 font-dm">
              We’d love to hear from you. Reach out for bookings, questions, or resort-related inquiries.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black font-dm"
            >
              {/* NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  required
                  className={inputClass}
                />
              </div>

              {/* MESSAGE */}
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  placeholder="Write your message..."
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BUTTON */}
              <motion.button
                ref={buttonRef}
                variants={fadeRight}
                initial="hidden"
                animate={buttonInView ? "visible" : "hidden"}
                transition={{ duration: 1.2 }}
                type="submit"
                className="lg:col-span-2 mt-4 bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
