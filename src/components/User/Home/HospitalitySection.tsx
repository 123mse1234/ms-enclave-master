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

export default function HospitalitySection() {
      const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="relative py-24">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]">

        {/* Left Image Column */}
        <motion.div
        ref={imgRef}
          variants={fadeLeft}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
         className="relative w-full h-full rounded-md min-h-[500px]">

          <Image
            src="/images/common/ms-enclave-54.webp"
            alt="Cozy hospitality stay"
            fill
            className="object-cover rounded-tr-[35px] rounded-bl-[35px] shadow-lg"
            priority
          />
        </motion.div>

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16">
          <div className="space-y-6">
            <motion.h1
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-4xl md:text-5xl font-semibold text-black leading-tight">
              Welcome to M.S. Enclave Heritage Resort
            </motion.h1>

            <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className="text-gray-950 text-lg leading-relaxed">
              Nestled in the peaceful surroundings of Mannuparambil, Paruthipully, Palakkad, M.S. Enclave Heritage Resort blends traditional Kerala architecture with modern comfort. Designed for families, couples, and nature lovers, our resort offers a calm and refreshing escape from everyday life.
            </motion.p>
            <MotionLink
            href="/about-us"
            ref={lintRef}
            variants={fadeRight}
            initial="hidden"
            animate={lintInView ? "visible" : "hidden"}
            transition={{ duration: 1.4 }}
            className="inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bouncerounded-md"
          >
            Know More About Us
          </MotionLink>
          </div>
        </div>

      </div>
    </section>
  );
}
