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

export default function HomeAboutSection() {
      const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="relative py-5">
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
            src="/images/common/ms-enclave-54.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover shadow-xl rounded"
            priority
          />
        </motion.div>

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div className="">
            <motion.p
                        ref={titleRef}
                        variants={fadeRight}
                        initial="hidden"
                        animate={titleInView ? "visible" : "hidden"}
                        transition={{ duration: 1 }}
                        className="text-3xl font-semibold font-dm text-gray-200 leading-tight"
                      >
                        Welcome to
                      </motion.p>
            
            <motion.h1
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-5xl mt-3 font-semibold text-amber-100 uppercase leading-tight text-shadow-sm ">
            M.S. Enclave Heritage Resort
            </motion.h1>
            <motion.h2
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-3xl font-semibold font-dm text-gray-200 leading-tight mb-2">
            Situated in Palakkad, Kerala
            </motion.h2>

            <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className="text-white font-medium text-lg leading-relaxed font-dm text-shadow-lg">
Delve into the traditional ambience with the convenience of modernity at our brand new resort.
Nestled next to the paddy fields of Palakkad with a breath taking view of the village called Paruthipully.
            </motion.p>
            <MotionLink
            href="/about-us"
            ref={lintRef}
            variants={fadeRight}
            initial="hidden"
            animate={lintInView ? "visible" : "hidden"}
            transition={{ duration: 1.4 }}
            className="mt-6 inline-block px-6 py-3 bg-black rounded text-white shadow-lg hover:animate-bounce"
          >
            Know More About Us
          </MotionLink>
          </div>
        </div>

      </div>
    </section>
  );
}
