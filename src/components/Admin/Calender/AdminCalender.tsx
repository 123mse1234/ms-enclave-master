"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";

type DayAvailability = {
  booked: number;
  available: number;
};

export default function AdminCalender() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [data, setData] = useState<Record<string, DayAvailability>>({});
  const [loading, setLoading] = useState(false);

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

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

  const getStatusColor = (available: number, day: number) => {
    if (available <= 0) return "bg-red-500";
    if (available <= 7) return "bg-yellow-400";
    return "bg-green-500";
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
      if (diff > 50) prevMonth(); // dragged right
      if (diff < -50) nextMonth(); // dragged left
    }
    dragStartX.current = null;
  };

  return (
    <div className="mx-auto p-6 shadow font-dm rounded-xl bg-gray-50">
      {/* Month Controls */}
      <div className="flex items-center justify-center gap-4 mb-6 font-dm">
        <button
          onClick={prevMonth}
          className="p-2 rounded bg-white text-black hover:bg-gray-300 hover:text-white"
        >
          ◀
        </button>

        <h1 className="text-xl font-black text-black text-center">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>

        <button
          onClick={nextMonth}
          className="p-2 rounded bg-white text-black hover:bg-gray-300 hover:text-white"
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
          className="grid grid-cols-7 gap-2 text-center select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-semibold text-black text-sm bg-white rounded py-1 shadow ">
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

            return (
              <Link
                href={`/admin/calendar-availability/${dateKey}`}
                key={dateKey}
                className={"block rounded-lg p-3 relative text-black bg-white hover:bg-blue-500 shadow "}
              >
                <div className="font-bold">{day}</div>
                <div className={` h-3 w-3 absolute top-2 right-2 rounded-full ${getStatusColor(
                  info?.available ?? 0,
                  day
              )}`} style={{height:'10px', width:"10px"}}></div>

                <p className="text-xs">Available: {info?.available ?? 0}</p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 flex gap-6 text-sm text-black">
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
