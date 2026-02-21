/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";
import PatternSection from "@/components/common/PatternSection";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (isSubmitting) return;
  setIsSubmitting(true);

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setShowConfetti(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setShowConfetti(false), 5000);

      toast.success("Your request has been submitted successfully. We will contact you shortly.", {
        position: "top-center",
        duration: 5000, // ⏱ hide after 3 seconds
      });
    } else {
      toast.error("Something went wrong while submitting. Please contact us through phone or WhatsApp.");
    }
  } catch (err) {
    toast.error("Something went wrong while submitting. Please contact us through phone or WhatsApp.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
    {/* 🎉 CONFETTI */}
          {showConfetti && (
      <ConfettiOverlay show={showConfetti} />
    
    
    )}
      <Breadcrumb
        heading="Get in Touch With Us"
        bgImage="/images/new/ms-enclave-drone-view.webp" // ⭐ background image
        items={[{ label: "Contact Us", href: "/contact" }]}
      />
      <PatternSection />
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
              We Are Here to Help You Plan a Perfect Stay
            </h2>

            <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">
              Have questions about bookings, packages, or amenities? Our team is always ready to assist you and make your stay at M.S. Enclave Heritage Resort smooth, comfortable, and memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
            {/* Left Side – Contact Info */}
            <div className="space-y-6">

              <div className="shadow py-3">
                <h2 className="text-3xl font-semibold text-yellow-100 leading-tight text-shadow-sm mb-4">
                  {" "}
                  Address
                </h2>
                <Link
                href="https://maps.app.goo.gl/MvrRJ2aN9SZZsFHL7"
                className="block text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3 ml-3"
              >
                Mannuparambil, Paruthipully Palakkad, <br />
                Kerala, India - 678573
              </Link>
              </div>

              <div className="shadow py-3">
                <p className="text-3xl font-semibold text-yellow-100 leading-tight text-shadow-sm mb-4">
                  Contact Number
                </p>
                <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3 ml-3">
                  <Link
                    href="tel:+918589996642"
                    className="hover:text-blue-600"
                  >
                    +91 97456 66642
                  </Link>
                </p>
                <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3 ml-3">
                  <Link
                    href="tel:+919945004857"
                    className="hover:text-blue-600"
                  >
                    +91 994 500 4857
                  </Link>
                </p>
              </div>

              <div className="shadow py-3">
                <p className="text-3xl font-semibold text-yellow-100 leading-tight text-shadow-sm mb-4">
                  Email
                </p>
                <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3 ml-3">
                  <Link
                    href="mailto:msenclaveresort@gmail.com"
                    className="hover:text-blue-600"
                  >
                    msenclaveresort@gmail.com
                  </Link>
                </p>
              </div>

              <div className="pt-5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2076.4752035927186!2d76.51303615225527!3d10.745094795833834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8750079d44dc5%3A0x5290675a530ee53c!2sMS%20ENCLAVE%20HERITAGE%20RESORT!5e0!3m2!1sen!2sin!4v1767093445007!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-xl border"
                ></iframe>
              </div>
            </div>

            {/* Right Side – Contact Form */}
            <div className="">
              <h2 className="text-3xl font-semibold text-yellow-100 leading-tight text-shadow-sm mb-4">
                  We Did Love to Hear From You
                </h2>
                <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3 ml-2">
              Have questions about bookings, packages, or amenities? Our team is always ready to assist you and make your stay at M.S. Enclave Heritage Resort smooth, comfortable, and memorable.
            </p>
              

              <form onSubmit={handleSubmit} className="space-y-5 bg-black/5 shadow-2xl rounded mt-5 p-4 font-dm">
                  <div>
                    <label className="block font-medium text-yellow-100 text-lg text-shadow-lg mb-3">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Here Enter Your Name"
                      className="w-full p-3 border-b  
                      focus:outline-none 
                      focus:border-b-yellow-100 
                      focus:border-t-transparent 
                      focus:border-l-transparent 
                      focus:border-r-transparent 
                      placeholder:text-white"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-yellow-100 text-lg text-shadow-lg mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Here Enter Your Email Address"
                      className="w-full p-3 border-b  
                      focus:outline-none 
                      focus:border-b-yellow-100 
                      focus:border-t-transparent 
                      focus:border-l-transparent 
                      focus:border-r-transparent 
                      placeholder:text-white"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-yellow-100 text-lg text-shadow-lg mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Here Enter Phone Number"
                      className="w-full p-3 border-b  
                      focus:outline-none 
                      focus:border-b-yellow-100 
                      focus:border-t-transparent 
                      focus:border-l-transparent 
                      focus:border-r-transparent 
                      placeholder:text-white"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-yellow-100 text-lg text-shadow-lg mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Write your message..."
                      rows={5}
                      className="w-full p-3 border-b  
                      focus:outline-none 
                      focus:border-b-yellow-100 
                      focus:border-t-transparent 
                      focus:border-l-transparent 
                      focus:border-r-transparent 
                      placeholder:text-white"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg text-lg font-semibold transition ${
                      isSubmitting
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:animate-bounce"
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
