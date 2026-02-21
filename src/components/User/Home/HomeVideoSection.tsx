"use client";

import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const scaleFade = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export default function HomeVideoSection() {
  const [open, setOpen] = useState(false);

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const btnInView = useInView(btnRef, { amount: 0.3 });

  return (
    <>
      {/* Background Section */}
      <section
        className="relative h-[85vh] w-full bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/new/ms-enclave-drone-view.webp')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-white">

          <motion.h2
            ref={titleRef}
            variants={fadeUp}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-dm drop-shadow-[3px_3px_3px_rgba(0,0,0)]"
          >
            Experience the Soul of Our Heritage Stay
          </motion.h2>

          <motion.p
            ref={textRef}
            variants={fadeUp}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1, delay: 0.2 }}
            className="leading-relaxed text-md md:text-lg font-dm font-medium text-shadow-md drop-shadow-[1px_1px_1px_rgba(0,0,0)]"
          >
            Step inside our world of warm hospitality, peaceful surroundings,
            and unforgettable comfort.
          </motion.p>

          {/* Play Button */}
          <motion.button
            ref={btnRef}
            variants={scaleFade}
            initial="hidden"
            animate={btnInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center justify-center shadow-xl bg-[#ffffff17] p-4 rounded-full hover:scale-110 transition-transform backdrop-blur-sm"
          >
            <Play size={42} className="text-white text-shadow-2xl" />
          </motion.button>
        </div>
      </section>

      {/* Video Popup */}
      {open && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/va9W1NfJ4D4?autoplay=1"
              title="M.S. Enclave Experience"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
