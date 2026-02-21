// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   motion,
//   useMotionValue,
//   useInView,
//   animate,
//   useMotionValueEvent,
// } from "framer-motion";
// import Image from "next/image";

// type CounterProps = {
//   value: number;
//   label: string;
//   suffix?: string;
// };

// export default function WhyChoosePartyHall() {
//   return (
//     <section className=" w-full h-[650px]">
//       <div className="w-full h-full flex relative items-center">
//         {/* BACKGROUND IMAGE */}
//         <Image
//           src="/images/common/ms-enclave-31.webp"
//           alt="Kerala Heritage Architecture"
//           fill
//           priority
//           className="object-cover "
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 " />

//         {/* CONTENT */}
//         <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 text-white ">
//           {/* TEXT */}
//           <div className="mb-16 ">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 font-dm drop-shadow-[3px_3px_3px_rgba(0,0,0)] text-center">
//               Why Choose Our Party Hall
//             </h2>

//             <h3 className="text-xl text-center md:text-2xl text-white font-bold mb-6 font-dm text-shadow-sm drop-shadow-[1px_1px_1px_rgba(0,0,0)]">
//               An Ideal Setting for Every Occasion
//             </h3>

//             <p className=" leading-relaxed text-md md:text-lg font-dm text-white font-medium  drop-shadow-[1px_1px_1px_rgba(0,0,0)] text-center">
//               Whether you are planning a birthday party, engagement ceremony,
//               anniversary celebration, or a small business meeting, our party
//               hall ensures a hassle-free and enjoyable experience. The calm
//               surroundings, professional service, and modern facilities make
//               every event smooth and memorable.
//             </p>
//           </div>

          
//         </div>
//       </div>
//     </section>
//   );
// }
