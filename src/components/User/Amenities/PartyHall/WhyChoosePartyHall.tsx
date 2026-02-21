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


export default function WhyChoosePartyHall() {
      const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });

  return (
    <section className="relative py-10">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]">

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div>
            <motion.h2
                        ref={titleRef}
                        variants={fadeLeft}
                        initial="hidden"
                        animate={titleInView ? "visible" : "hidden"}
                        transition={{ duration: 1 }}
                        className="text-5xl font-semibold text-gray-200 leading-tight font-playfair"
                      >
                        Why Choose
                      </motion.h2>
            <motion.p
            ref={titleRef}
            variants={fadeLeft}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-6xl font-semibold text-amber-100 leading-tight text-shadow-sm mt-2">
              An Ideal Setting for Every Occasion
            </motion.p>

            <motion.p
            ref={textRef}
            variants={fadeLeft}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
              Whether you are planning a birthday party, engagement ceremony,
             anniversary celebration, or a small business meeting, our party
             hall ensures a hassle-free and enjoyable experience. The calm
             surroundings, professional service, and modern facilities make
           every event smooth and memorable.
            </motion.p>

            
           
          </div>
          
        </div>

        {/* Left Image Column */}
        <motion.div
        ref={imgRef}
          variants={fadeRight}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
         className="relative w-full h-full rounded-md min-h-[550px] pb-5">

          <Image
            src="/images/new/ms-enclave-conference-hall-2.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded-md shadow-md"
            priority
          />
        </motion.div>

        
      </div>
    </section>
  );
}
