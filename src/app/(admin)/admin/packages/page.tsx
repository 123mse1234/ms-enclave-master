"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";
import AdminBreadcrumb from "@/components/common/AdminHeader/AdminBreadcrumb";
import PatternSection from "@/components/common/PatternSection";

export default function ViewPackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minAdults, setMinAdults] = useState("");
  const [minChildren, setMinChildren] = useState("");

  // 🔽 Sorting
  const [sortPrice, setSortPrice] = useState<"" | "low" | "high">("");

  // 📊 View mode
  const [view, setView] = useState<"grid" | "list">("grid");

  const router = useRouter();

  // 📦 Fetch packages
  const fetchPackages = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();
    if (data.success) setPackages(data.data);
    setLoading(false);
  };

  // 🗑 Delete package
  const deletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    await fetch(`/api/packages/edit/${id}`, { method: "DELETE" });
    setPackages((prev) => prev.filter((p) => p._id !== id));
  };

  // 🔁 Reset filters
  const resetFilters = () => {
    setSearch("");
    setMaxPrice("");
    setMinAdults("");
    setMinChildren("");
    setSortPrice("");
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // 🧠 Filter + Sort logic
  const filteredPackages = useMemo(() => {
    let result = packages
      .filter((pkg) => {
        return (
          pkg.packageName.toLowerCase().includes(search.toLowerCase()) ||
          pkg.description.toLowerCase().includes(search.toLowerCase())
        );
      })
      .filter((pkg) => {
        return (
          (!maxPrice || pkg.indianPrice <= Number(maxPrice)) &&
          (!minAdults || pkg.maxAdults >= Number(minAdults)) &&
          (!minChildren || pkg.maxChildren >= Number(minChildren))
        );
      });

    if (sortPrice === "low") {
      result = [...result].sort((a, b) => a.indianPrice - b.indianPrice);
    }

    if (sortPrice === "high") {
      result = [...result].sort((a, b) => b.indianPrice - a.indianPrice);
    }

    return result;
  }, [packages, search, maxPrice, minAdults, minChildren, sortPrice]);

  if (loading) return <Loader />;

  return (
    <section>
      {/* <PatternSection /> */}
      <div className="p-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm text-center ">Package Management</h1>
          <p className="text-center text-white font-medium text-3xl text-shadow-lg leading-relaxed font-dm mt-2">Create, Edit & Manage Resort Packages</p>
          <p className="text-center text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">Easily manage all resort packages from one centralized dashboard. View complete package details including pricing, guest limits, and inclusions. You can add new packages, edit existing ones, or delete outdated packages to keep your offerings updated and organized.</p>
        </div>
        {/* 🔍 FILTER BAR */}
        <div className="bg-white text-black rounded-xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-7 gap-4 font-dm">
          <input
            placeholder="Search package..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded text-black"
          />

          <input
            placeholder="Max Price ₹"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Min Adults"
            type="number"
            value={minAdults}
            onChange={(e) => setMinAdults(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Min Children"
            type="number"
            value={minChildren}
            onChange={(e) => setMinChildren(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value as any)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 rounded border ${
                view === "grid" ? "bg-black text-white" : ""
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 rounded border ${
                view === "list" ? "bg-black text-white" : ""
              }`}
            >
              List
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white rounded px-3 py-2 hover:bg-red-600"
          >
            Reset
          </button>
        </div>

        {/* 📦 PACKAGES */}
        <div
          className={`grid gap-6 font-dm ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              className={`bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden ${
                view === "list" ? "flex gap-4" : ""
              }`}
            >
              <img
                src={pkg.image}
                className={`object-cover ${
                  view === "list" ? "w-64 h-48" : "h-52 w-full"
                }`}
              />

              <div className="p-4 flex-1">
                <h2 className="text-xl font-bold text-black">
                  {pkg.packageName}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{pkg.description}</p>

                <div className="mt-3 text-sm text-black">
                  <p>
                    ₹ {pkg.indianPrice} — $ {pkg.foreignPrice}
                  </p>
                  <p>Adults: {pkg.maxAdults}</p>
                  <p>Children: {pkg.maxChildren}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => router.push(`/admin/packages/${pkg.slug}`)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() =>
                      router.push(`/admin/packages/edit/${pkg._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deletePackage(pkg._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPackages.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No packages found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
