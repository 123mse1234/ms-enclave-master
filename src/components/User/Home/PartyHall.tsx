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

const PartyHall = () => {
  const mainImgRef = useRef(null);
  const overlapImgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  const mainImgInView = useInView(mainImgRef, { amount: 0.3 });
  const overlapImgInView = useInView(overlapImgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const btnInView = useInView(btnRef, { amount: 0.3 });

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT IMAGE AREA */}
        <motion.div
          ref={mainImgRef}
          variants={fadeLeft}
          initial="hidden"
          animate={mainImgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          className="relative lg:h-[600px] w-full"
        >
          {/* Main Image */}
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/new/ms-enclave-conference-hall.webp"
              alt="Luxury Stay"
              width={700}
              height={500}
              className="w-full h-auto object-cover md:h-[520px]"
            />
          </div>

          {/* Overlapping Image */}
          <motion.div
            ref={overlapImgRef}
            variants={fadeLeft}
            initial="hidden"
            animate={overlapImgInView ? "visible" : "hidden"}
            transition={{ duration: 1.2 }}
            className="absolute -right-10 top-1/3 hidden lg:block"
          >
            <div className="rounded-lg overflow-hidden shadow-xl ">
              <Image
                src="/images/new/ms-enclave-conference-hall.webp"
                alt="Interior"
                width={220}
                height={260}
                className="object-cover h-[300px]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <div className="px-6 lg:px-24 flex flex-col justify-center gap-6">
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
            className="text-5xl font-semibold text-amber-100 leading-tight text-shadow-sm mt-[-15px]"
          >
            An Elegant Venue for Your Special Moments
          </motion.p>

          <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1.1 }}
            className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm"
          >
            At M.S. Enclave, we pride ourselves on providing a personalized
            and intimate experience for each guest. Our cozy rooms are
            thoughtfully designed to offer modern amenities while retaining
            the warmth and character of a home away from home.
          </motion.p>

          <MotionLink
            href="/amenities/party-hall"
            ref={btnRef}
            variants={fadeRight}
            initial="hidden"
            animate={btnInView ? "visible" : "hidden"}
            transition={{ duration: 1.3 }}
          >
            <button className="mt-6 inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce ">
              Explore Our Party Hall
            </button>
          </MotionLink>
        </div>

      </div>
    </section>
  );
};

export default PartyHall;
