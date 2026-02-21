"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const MotionLink = motion(Link);

export default function AboutSection() {
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const listRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const listInView = useInView(listRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <motion.div
          ref={imgRef}
          variants={fadeLeft}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-full h-full border border-amber-400 rounded-lg"></div>

          <Image
            src="/images/common/ms-enclave-54.webp"
            alt="Private Event"
            width={700}
            height={500}
            className="rounded-lg shadow-lg relative z-10"
          />
        </motion.div>

        {/* Right Content */}
        <div className="space-y-6">
          {/* Title */}
          <motion.h2
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-gray-900"
          >
            PERFECT PLACE <br /> FOR PRIVATE EVENTS
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="text-gray-800 leading-relaxed"
          >
            Whether you're hosting a corporate event, cocktail party, luncheon,
            wedding reception, or rehearsal dinner — we offer beautiful private
            spaces that can accommodate up to 180 guests.
          </motion.p>

          {/* List */}
          <motion.ul
            ref={listRef}
            variants={fadeRight}
            initial="hidden"
            animate={listInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-3 text-gray-800 pl-3 text-sm list-disc"
          >
            <li>ORGANIZE A WEDDING</li>
            <li>CUSTOM DECORATION</li>
            <li>YOUR SPECIAL EVENT</li>
            <li>PRIVATE DINING ROOM</li>
          </motion.ul>
          {/* List */}

          <MotionLink
            href="/about-us"
            ref={lintRef}
            variants={fadeRight}
            initial="hidden"
            animate={lintInView ? "visible" : "hidden"}
            transition={{ duration: 1.4 }}
            className="inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bouncerounded-md"
          >
            GET STARTED FOR YOUR EVENT
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
