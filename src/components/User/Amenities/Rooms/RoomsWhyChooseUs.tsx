"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import WhyChooseRooms from "./WhyChooseRooms";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const MotionLink = motion(Link);

export default function RoomsWhyChooseUs() {
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="relative py-10 ">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div className="space-y-6">
            <motion.h1
              ref={titleRef}
              variants={fadeLeft}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              transition={{ duration: 1 }}
              className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm"
            >
              Why Choose Our Rooms?
            </motion.h1>
            <motion.p
              ref={textRef}
              variants={fadeRight}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              transition={{ duration: 1 }}
              className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3"
            >
              At M.S. Enclave Heritage Resort, we offer more than just a place
              to stay — we provide an experience rooted in Kerala’s cultural
              heritage and warm hospitality. Our thoughtfully designed rooms,
              peaceful surroundings, and personalized services ensure a relaxing
              and memorable stay for every guest.
            </motion.p>
            <motion.div
              ref={lintRef}
              variants={fadeRight}
              initial="hidden"
              animate={lintInView ? "visible" : "hidden"}
              transition={{ duration: 1.4 }}
            >
              <WhyChooseRooms />
            </motion.div>
          </div>
        </div>

        {/* Left Image Column */}
        <motion.div
          ref={imgRef}
          variants={fadeRight}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          className="relative w-full h-full rounded-md min-h-[500px] max-h-[500px] pb-5"
        >
          <Image
            src="/images/common/ms-enclave-24.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded-tl-[35px] rounded-br-[35px] shadow-md pb-2 pl-2"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
