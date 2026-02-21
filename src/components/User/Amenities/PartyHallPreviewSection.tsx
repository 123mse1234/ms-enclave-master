"use client";

import { motion, useInView, AnimatePresence, PanInfo } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

// Swipe helpers
const swipeConfidenceThreshold = 100;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function PartyHallPreviewSection() {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const lintRef = useRef<HTMLDivElement | null>(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  // 🖼 Images
  const images = [
    "/images/common/ms-enclave-31.webp",
    "/images/common/ms-enclave-45.webp",
    "/images/new/ms-enclave-conference-hall.webp",
    "/images/common/ms-enclave-32.webp",
    "/images/common/ms-enclave-33.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [direction, setDirection] = useState(0);

  // ⏱ Auto slide (pause on hover)
  useEffect(() => {
    if (isPaused || zoomed) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isPaused, zoomed]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="py-16 px-5 md:px-0 theme-bg">
      <section className="max-w-7xl mx-auto">
        <div className="mx-auto grid md:grid-cols-10 gap-2  min-h-[500px]">
          {/* Right Content */}
          <motion.div
            ref={imgRef}
            variants={fadeLeft}
            initial="hidden"
            animate={imgInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="relative w-full h-full rounded-md min-h-[500px] pb-5 overflow-hidden group col-span-10 md:col-span-6 shadow-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                className="absolute inset-0 cursor-zoom-in"
                initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, info: PanInfo) => {
                  const swipe = swipePower(info.offset.x, info.velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextSlide();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevSlide();
                  }
                }}
                onClick={() => setZoomed(true)}
              >
                <Image
                  src={images[currentIndex]}
                  alt="M.S. Enclave Heritage Resort Palakkad"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition ${
                    i === currentIndex ? "bg-white scale-110" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Left Image Column */}
          <div className="flex items-center px-6 md:px-16 mt-10 col-span-10 md:col-span-4">
            <div>
              <motion.h2
                ref={titleRef}
                variants={fadeRight}
                initial="hidden"
                animate={titleInView ? "visible" : "hidden"}
                transition={{ duration: 1 }}
                className="text-4xl md:text-5xl font-semibold text-white leading-tight text-shadow-lg"
              >
                Party Hall
              </motion.h2>

              <motion.p
                ref={textRef}
                variants={fadeRight}
                initial="hidden"
                animate={textInView ? "visible" : "hidden"}
                transition={{ duration: 1 }}
                className="text-gray-50 font-medium text-md font-dm mt-3 leading-relaxed"
              >
                A well-designed Party hall suitable for meetings and corporate
                gatherings. Equipped with a comfortable seating arrangement and
                a peaceful atmosphere. Ideal for business meetings, training
                sessions, and small conferences. Offers a professional space
                within a calm resort environment.
              </motion.p>

              <motion.div
                ref={lintRef}
                variants={fadeRight}
                initial="hidden"
                animate={lintInView ? "visible" : "hidden"}
                transition={{ duration: 1.4 }}
              >
                <Link
                  href="/amenities/party-hall"
                  className="inline-block px-6 py-3 bg-gray-950 mt-8 rounded text-white"
                >
                  More About Party Hall
                </Link>
              </motion.div>
            </div>
          </div>

          
        </div>
      </section>

      {/* 🖼 ZOOM MODAL */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setZoomed(false)}
            >
              <X size={30} />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh]"
            >
              <Image
                src={images[currentIndex]}
                alt="Zoomed preview"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
