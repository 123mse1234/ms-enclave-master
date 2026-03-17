"use client";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isShown: boolean;
  createdAt?: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">("all");

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/messages/all");
      const data = await res.json();
      setMessages(data.messages);
      console.log(data.messages);
      
    } catch (error) {
      console.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsShown = async (id: string) => {
    await fetch("/api/messages/show", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadMessages();
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // 🔥 FILTER LOGIC
  const filteredMessages = messages.filter((msg) => {
    if (filter === "verified") return msg.isShown;
    if (filter === "unverified") return !msg.isShown;
    return true;
  });
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-semibold text-yellow-100 leading-tight text-shadow-sm text-center">
        Form Submissions
      </h1>

      <h2 className="text-2xl font-dm font-semibold text-white leading-tight text-shadow-sm text-center">
        Manage & Verify Customer Enquiries
      </h2>

      <p className="text-center text-white font-medium text-md text-shadow-lg leading-relaxed font-dm mb-8 mt-3">
        View all customer enquiries and form submissions in one place. Check
        user details, messages, and respond efficiently to each request. To
        verify a message, simply click once on the message box — it will
        automatically be marked as verified for easy tracking and management.
      </p>

      {/* 🔥 FILTER BUTTONS */}
      <div className="flex justify-center gap-3 mb-6 font-dm">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          View All
        </button>

        <button
          onClick={() => setFilter("verified")}
          className={`px-4 py-2 rounded-lg ${
            filter === "verified"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Verified
        </button>

        <button
          onClick={() => setFilter("unverified")}
          className={`px-4 py-2 rounded-lg ${
            filter === "unverified"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Unverified
        </button>
      </div>

      {loading && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-dm">
  {filteredMessages.map((msg) => (
    <div
      key={msg._id}
      className={`bg-[#7a0002] border border-yellow-50/25 rounded-2xl shadow-2xl p-5 cursor-pointer transition hover:bg-[#8f0003] ${
        !msg.isShown ? "ring-1 ring-yellow-200/70" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-700 text-white flex items-center justify-center font-semibold text-lg">
            {msg.name?.charAt(0).toUpperCase()}
          </div>

          {!msg.isShown && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 capitalize">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-white">{msg.name}</h3>

            {msg.createdAt && (
              <span className="text-xs text-gray-50">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* FIXED EMAIL LINK */}
          <Link
            href={`mailto:${msg.email}`}
            className="text-md text-gray-50 block mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            Mail: {msg.email}
          </Link>

          <Link
            href={`tel:${msg.phone}`}
            className="text-md text-gray-50 block"
            onClick={(e) => e.stopPropagation()}
          >
            Phone: {msg.phone}
          </Link>

          <p className="text-md text-gray-50 line-clamp-2">
            Enquiry: {msg.message}
          </p>
          {!msg.isShown && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      markAsShown(msg._id);
    }}
    className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold shadow-md hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all duration-200"
  >
    Verify
  </button>
)}
        </div>
      </div>
    </div>
  ))}

  {/* EMPTY STATE */}
  {filteredMessages.length === 0 && !loading && (
    <div className="col-span-full p-8 text-center text-gray-400">
      No messages found.
    </div>
  )}
</div>
    </div>
  );
}