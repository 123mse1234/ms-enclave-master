"use client";

import { useState } from "react";
import { videos} from "./videoList"; // 

const TABS = ["all", "shorts", "video", ];

export default function VideoGallery() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredVideos =
    activeTab === "all"
      ? videos
      : videos.filter((v) => v.type === activeTab);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <div className="text-center pb-10">
          <h2 className="text-5xl mt-3 font-semibold text-amber-100 leading-tight">
            Choose Videos by Category
          </h2>
          <p className="text-white font-medium text-lg mt-3">
            Browse videos by category and explore your content easily.
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  activeTab === tab
                    ? "bg-[#7a0002] text-yellow-300"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl break-inside-avoid"
            >
              <div
                className={`w-full ${
                  video.orientation === "portrait"
                    ? "aspect-[6/7]"
                    : "aspect-video"
                }`}
              >
                <iframe
                  src={video.url}
                  title="video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {filteredVideos.length === 0 && (
          <p className="text-center text-gray-300 mt-10">
            No videos found
          </p>
        )}
      </div>
    </section>
  );
}