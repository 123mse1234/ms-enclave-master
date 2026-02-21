"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type OccupancyData = {
  totalRooms: number;
  bookedRooms: number;
  availableRooms: number;
  occupancy: number;
};

export default function OccupancyPage() {
  const [data, setData] = useState<OccupancyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOccupancy = async () => {
      try {
        const res = await axios.get("/api/admin/occupancy");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load occupancy", err);
      } finally {
        setLoading(false);
      }
    };

    loadOccupancy();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading occupancy data...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center text-red-600">
        Failed to load occupancy data
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        🏨 Occupancy Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Rooms"
          value={data.totalRooms}
          color="bg-blue-600"
        />

        <StatCard
          title="Booked Today"
          value={data.bookedRooms}
          color="bg-orange-500"
        />

        <StatCard
          title="Available Rooms"
          value={data.availableRooms}
          color="bg-green-600"
        />

        <StatCard
          title="Occupancy"
          value={`${data.occupancy}%`}
          color="bg-purple-600"
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-xl shadow bg-white p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color.replace("bg", "text")}`}>
        {value}
      </h2>
    </div>
  );
}
