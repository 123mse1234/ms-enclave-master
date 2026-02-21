"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};


export default function PartyHallWelcome() {
      const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });

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
         className="relative w-full h-full rounded-md min-h-[550px] pb-5">

          <Image
            src="/images/new/ms-enclave-conference-hall.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded-md shadow-md"
            priority
          />
        </motion.div>

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div>
            <motion.h2
                        ref={titleRef}
                        variants={fadeRight}
                        initial="hidden"
                        animate={titleInView ? "visible" : "hidden"}
                        transition={{ duration: 1 }}
                        className="text-5xl font-semibold text-gray-200 leading-tight font-playfair"
                      >
                        Party Hall
                      </motion.h2>
            <motion.p
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-6xl font-semibold text-amber-100 leading-tight text-shadow-sm mt-2">
              A Perfect Venue for Celebrations
            </motion.p>

            <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
              Our Mini Party Hall at <strong>M.S. Enclave Heritage Resort</strong> is
          ideal for hosting weddings, birthday parties, engagement ceremonies,
          family functions, and corporate meetings. Designed with comfort and
          elegance, the fully air-conditioned hall offers a peaceful atmosphere
          surrounded by nature.
            </motion.p>

            
           
          </div>
          
        </div>
      </div>
    </section>
  );
}
