"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};


export default function AboutSectionHistory() {
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
            src="/images/common/ms-enclave-6.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover shadow-md"
            priority
          />
        </motion.div>

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div className="space-y-6">
            <motion.h2
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-3xl font-semibold font-dm text-gray-200 leading-tight">
              Our Story
            </motion.h2>
            <motion.h1
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-5xl mt-3 font-semibold text-amber-100 uppercase leading-tight text-shadow-sm ">
              Where Tradition Meets Tranquility
            </motion.h1>
            

            <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className="text-white font-medium text-lg leading-relaxed font-dm text-shadow-lg">
              M.S. Enclave Heritage Resort was founded with the vision of bringing the charm
  of traditional Kerala hospitality to modern travelers. Nestled in the serene
  village of Paruthipully, Palakkad, our heritage resort preserves the cultural
  essence of Kerala while offering modern luxury and comfort. Over the years,
  we have become a preferred destination for families, nature lovers, and
  travelers seeking a peaceful and rejuvenating retreat in Palakkad, Kerala.
            </motion.p>
          </div>
        </div>

      </div>
    </section>
  );
}
