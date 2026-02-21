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

export default function RoomsWelcomeSection() {
      const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="relative py-10">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]">

        {/* Left Image Column */}
        <motion.div
        ref={imgRef}
          variants={fadeLeft}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
         className="relative w-full h-full rounded-md min-h-[500px] pb-5">

          <Image
            src="/images/common/ms-enclave-26.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded shadow-md "
            priority
          />
        </motion.div>

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div className="">
            <motion.h1
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
              Traditional Comfort with Modern Elegance
            </motion.h1>

            <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
              Experience a peaceful stay in our well-furnished heritage-style rooms,
      thoughtfully designed to provide comfort, privacy, and relaxation.
      Each room at <strong>M.S. Enclave Heritage Resort</strong> reflects
      Kerala’s traditional charm while offering modern amenities for a
      pleasant and memorable stay.
            </motion.p>
            <MotionLink
            href="/packages"
            ref={lintRef}
            variants={fadeRight}
            initial="hidden"
            animate={lintInView ? "visible" : "hidden"}
            transition={{ duration: 1.4 }}
            className="mt-6 inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce  "
          >
            Select A Package
          </MotionLink>
          </div>
        </div>

      </div>
    </section>
  );
}
