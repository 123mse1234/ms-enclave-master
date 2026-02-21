"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "@/components/common/Loader";

type DayAvailability = {
  booked: number;
  available: number;
};

export default function UserCalendarAvailability() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ✅ normalize today

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [data, setData] = useState<Record<string, DayAvailability>>({});
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<
    number | null
  >(null);

  const calendarRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/admin/calendar-availability?year=${year}&month=${month}`
      );
      setData(res.data);
      
    } catch (err) {
      console.error("Failed to load availability", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAvailability();
  }, [year, month]);

  useEffect(() => {
    if (selectedDate && selectedAvailability !== null) {
      const timer = setTimeout(() => {
        setSelectedDate(null);
        setSelectedAvailability(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [selectedDate, selectedAvailability]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

  const getStatusColor = (available: number) => {
    if (available <= 0) return "bg-red-500";
    if (available <= 7) return "bg-yellow-400";
    return "bg-green-500";
  };

  const isPastDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Month navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      const diff = e.clientX - dragStartX.current;
      if (diff > 50) prevMonth();
      if (diff < -50) nextMonth();
    }
    dragStartX.current = null;
  };

  const handleDaySelect = (
    dateKey: string,
    available: number = 0,
    isPast?: boolean
  ) => {
    if (isPast) return;

    setSelectedDate(dateKey);
    setSelectedAvailability(available);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 theme-bg shadow-2xl border border-yellow-100/10 rounded-2xl">
      {/* Month Controls */}
      <div className="flex items-center justify-center gap-4 mb-6 font-dm">
        <button
          onClick={prevMonth}
          className="p-2 rounded text-white hover:animate-bounce hover:text-yellow-100 "
        >
          ◀
        </button>

        <p className="text-xl font-bold text-yellow-100 text-center">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <button
          onClick={nextMonth}
          className="p-2 rounded text-white hover:animate-bounce hover:text-yellow-100"
        >
          ▶
        </button>
      </div>

      {/* Calendar */}
      {loading ? (
        <p>Loading availability...</p>
      ) : (
        <div
          ref={calendarRef}
          className="grid grid-cols-7 gap-2 text-center select-none font-dm"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-semibold text-gray-50 text-shadow-sm">
              {d}
            </div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = `${year}-${String(month + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;
            const info = data[dateKey];
            const past = isPastDate(year, month, day);

            return (
              <div
                key={dateKey}
                className={`relative rounded-lg p-3 text-white shadow-sm cursor-pointer ${
                  past ? "opacity-40 cursor-not-allowed" : ""
                } text-white`}
                onMouseEnter={() =>
                  handleDaySelect(dateKey, info?.available, past)
                }
                onClick={() => handleDaySelect(dateKey, info?.available, past)}
              >
                <div className="font-bold text-shadow-sm">{day}</div>
                <div
                  className={`absolute top-2 right-2 rounded-full ${getStatusColor(
                    info?.available ?? 0
                  )} ${
                  past ? "bg-transparent" : ""
                }`}
                  style={{ height: "7px", width: "7px" }}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {/* Availability info */}
      {selectedDate && selectedAvailability !== null && (
        <div
          className={`mt-4 p-3 rounded text-center font-dm transition
      ${
        selectedAvailability > 0
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
        >
          {selectedAvailability > 0
            ? `${selectedAvailability} rooms available on ${new Date(
                selectedDate
              ).toDateString()}`
            : `No rooms available on ${new Date(selectedDate).toDateString()}`}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 flex gap-6 text-sm text-white font-dm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span>
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-400 rounded"></span>
          Limited
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded"></span>
          Fully Booked
        </div>
      </div>
    </div>
  );
}
