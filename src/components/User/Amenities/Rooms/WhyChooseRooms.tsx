"use client";

import { useState } from "react";

const reasons = [
  {
    title: "Peaceful and Natural Surroundings",
    description:
      "Enjoy a calm and refreshing environment surrounded by greenery, ideal for relaxation and rejuvenation away from city noise.",
  },
  {
    title: "Traditional Kerala Heritage Ambiance",
    description:
      "Experience authentic Kerala architecture and cultural aesthetics that reflect the region’s timeless traditions.",
  },
  
];

export default function WhyChooseRooms() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className=" ">
      {/* Accordion */}
      <div className="space-y-3">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="shadow-md rounded-xl overflow-hidden"
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full flex justify-between items-center p-4 text-left font-semibold hover:text-yellow-100 hover:font-bold"
            >
              <span className=" text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">{item.title}</span>
              <span className=" text-white text-md font-dm">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div className="px-4 pb-4 text-white font-dm">
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
