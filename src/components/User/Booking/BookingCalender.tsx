"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

type DayAvailability = {
  booked: number;
  available: number;
};

type BookingCalendarProps = {
  onDateSelect?: (date: string) => void; // Pass selected date to parent
};

export default function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [data, setData] = useState<Record<string, DayAvailability>>({});
  const [loading, setLoading] = useState(false);

  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [hoveredAvailability, setHoveredAvailability] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  // ---------------- Fetch Availability ----------------
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

  // ---------------- Calendar Helpers ----------------
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const isPastDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getStatusColor = (available: number) => {
    if (available <= 0) return "text-red-500";
    if (available <= 5) return "text-yellow-500";
    return "text-black";
  };

  // ---------------- Month Navigation ----------------
  const prevMonth = () => {
    if (month === 0) setYear((y) => y - 1), setMonth(11);
    else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) setYear((y) => y + 1), setMonth(0);
    else setMonth((m) => m + 1);
  };

  // ---------------- Drag handlers ----------------
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

  // ---------------- Day Handlers ----------------
  const handleDayHover = (dateKey: string, available: number, isPast: boolean) => {
    if (isPast) return;

    setHoveredDate(dateKey);
    setHoveredAvailability(available);
  };

  const handleDayClick = (dateKey: string, available: number, isPast: boolean) => {
    if (isPast || available <= 0) return; // cannot select past or fully booked

    setSelectedDate(dateKey);

    if (onDateSelect) {
      onDateSelect(dateKey);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 shadow-i font-dm">
      {/* Month Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button onClick={prevMonth} className="p-2 rounded bg-white hover:bg-gray-300">◀</button>
        <h1 className="text-xl font-bold text-black text-center">
          {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
        </h1>
        <button onClick={nextMonth} className="p-2 rounded bg-white hover:bg-gray-300">▶</button>
      </div>

      {/* Calendar */}
      {loading ? (
        <p>Loading availability...</p>
      ) : (
        <div
          ref={calendarRef}
          className="grid grid-cols-7 gap-2 text-center select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-semibold text-black">{d}</div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const info = data[dateKey];
            const past = isPastDate(year, month, day);

            return (
              <div
                key={dateKey}
                className={`rounded-lg p-3 shadow cursor-pointer transition
                  ${getStatusColor(info?.available ?? 0)}
                  ${past ? "opacity-40 cursor-not-allowed" : ""}
                  ${selectedDate === dateKey ? "ring-2 ring-blue-500" : ""}
                `}
                onMouseEnter={() => handleDayHover(dateKey, info?.available ?? 0, past)}
                onClick={() => handleDayClick(dateKey, info?.available ?? 0, past)}
              >
                <div className="font-bold text-shadow-sm">{day}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Availability Info */}
      {hoveredDate && hoveredAvailability !== null && (
        <div
          className={`mt-4 p-3 rounded text-center transition
            ${hoveredAvailability > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
            }`}
        >
          {hoveredAvailability > 0
            ? `${hoveredAvailability} rooms available on ${new Date(hoveredDate).toDateString()}`
            : `No rooms available on ${new Date(hoveredDate).toDateString()}`}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 flex gap-6 text-sm text-black">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span> Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-400 rounded"></span> Limited
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded"></span> Fully Booked
        </div>
      </div>
    </div>
  );
}
