"use client";
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

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/messages/all");
      const data = await res.json();
      setMessages(data.messages);
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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Inbox Messages</h2>

      {loading && (
        <div className="text-center text-gray-500 py-10">
          Loading messages...
        </div>
      )}

      <div className="bg-white rounded-2xl shadow divide-y">
        {messages.map((msg) => (
          <div
            key={msg._id}
            onClick={() => markAsShown(msg._id)}
            className={`flex items-start gap-4 p-5 cursor-pointer transition hover:bg-gray-50 ${
              !msg.isShown ? "bg-blue-50/40" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-700 text-white flex items-center justify-center font-semibold text-lg">
                {msg.name?.charAt(0).toUpperCase()}
              </div>

              {!msg.isShown && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">
                  {msg.name}
                </h3>

                {msg.createdAt && (
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">{msg.email}</p>

              <p className="mt-2 text-gray-700 line-clamp-2">
                {msg.message}
              </p>
            </div>
          </div>
        ))}

        {messages.length === 0 && !loading && (
          <div className="p-8 text-center text-gray-400">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}