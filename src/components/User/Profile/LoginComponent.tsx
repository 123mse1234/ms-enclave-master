"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};


export default function LoginComponent() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/profile");
      toast.success("You Also Login");
    }
  }, [session, router]);

  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="relative pt-24">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Left Image Column */}
        <motion.div
          ref={imgRef}
          variants={fadeLeft}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          className="relative w-full h-full rounded-md min-h-[500px] pb-5"
        >
          <Image
            src="/images/common/ms-enclave-26.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded-tr-[35px] rounded-bl-[35px] shadow-md pb-2 pr-2"
            priority
          />
        </motion.div>
        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div className="space-y-6">
            <motion.h1
              ref={titleRef}
              variants={fadeRight}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              transition={{ duration: 1 }}
              className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm"
            >
              Sign in to Continue
            </motion.h1>

            <motion.p
              ref={textRef}
              variants={fadeRight}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              transition={{ duration: 1 }}
              className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3"
            >
              Log in securely using your Google account to manage your bookings,
              view reservation details, and enjoy a smooth, hassle-free
              experience with M.S. Enclave Heritage Resort. We do not store your
              password and respect your privacy.
            </motion.p>
            <motion.div
              ref={lintRef}
              variants={fadeRight}
              initial="hidden"
              animate={lintInView ? "visible" : "hidden"}
              transition={{ duration: 1.4 }}
              className="mt-3"
            >
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded-full shadow hover:shadow-md transition"
              >
                <Image
                  src="/images/icon/g-logo.png"
                  alt="Google"
                  className="w-5 h-5"
                  width={5}
                  height={5}
                />
                <span className="text-black font-dm font-black text-md">
                  Continue with Google
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
