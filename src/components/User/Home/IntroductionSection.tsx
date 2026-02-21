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

export default function IntroductionSection() {
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
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
            className="text-4xl font-bold text-black uppercase"
          >
            Welcome to <br />  M.S. Enclave <br />Heritage Resort 
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="text-black leading-relaxed"
          >
            Nestled in the peaceful surroundings of Mannuparambil, Paruthipully, Palakkad,
M.S. Enclave Heritage Resort blends traditional Kerala architecture with modern comfort.
Designed for families, couples, and nature lovers, our resort offers a calm and refreshing escape from everyday life.
          </motion.p>

          <MotionLink
            href="/about-us"
            ref={lintRef}
            variants={fadeRight}
            initial="hidden"
            animate={lintInView ? "visible" : "hidden"}
            transition={{ duration: 1.4 }}
            className="mt-3 inline-block px-6 py-3 bg-gray-950 text-white rounded-md"
          >
            Know More About Us
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
