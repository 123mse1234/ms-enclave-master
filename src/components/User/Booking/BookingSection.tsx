"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import RoomRules from "./RoomRules";
import Amenities from "./Amenities";
import RoomHighlights from "./RoomHighlights";
import Link from "next/link";
import toast from "react-hot-toast";
import { validateUserProfile } from "@/utils/validateUserProfile";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";

export default function BookingSection() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [pkg, setPkg] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [stayType, setStayType] = useState("single");
  const [nights, setNights] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);



  const today = new Date().toISOString().split("T")[0];
  const [user, setUser] = useState({})
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    adults: "",
    children: "",
    date: today,
  });

  const [roomsNeeded, setRoomsNeeded] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchAvailability = async (date: string, nights: number) => {
    if (!pkg?._id) return;

    const res = await axios.get("/api/bookings/availability", {
      params: {
        packageId: pkg._id,
        checkIn: date,
        nights,
      },
    });

    setMaxAvailableRooms(res.data.availableRooms);
  };

  const [maxAvailableRooms, setMaxAvailableRooms] = useState(0);

  // useEffect(() => {
  //   fetchAvailability(form.date, Number(nights));
  // }, []);

  const noRooms: boolean = maxAvailableRooms === 0;
  const currentPath = window.location.pathname + window.location.search;

  useEffect(() => {
    if (!(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Loader Function
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`/api/packages/${slug}`);
        setPkg(res.data.data);
        setLoading(false);

        if (session?.user) {
          setUser(session.user)
          validateUserProfile(session.user);
          setForm((prev) => ({
            ...prev,
            fullName: session.user.name || "",
            email: session.user.email || "",
            phone: session.user.phone || "",
          }));
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (slug) loadData();
  }, [slug, session]);

  // Load fetchAvailability
  useEffect(() => {
  if (pkg?._id && form.date && nights) {
    fetchAvailability(form.date, Number(nights));
  }
}, [pkg?._id, form.date, nights]);


  // -------- GST FUNCTION ----------
  const applyGST = (amount: number) => {
    const gst = amount * 0.18; // 18% GST
    return amount + gst;
  };

  // RazorPayLoader 
  const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

  // -------- RAZORPAY PAYMENT ----------
  const handleRazorpayPayment = async (booking: any) => {
  try {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const res = await axios.post("/api/payments/razorpay", {
      amount: booking.totalPrice,
      currency: "INR",
      bookingId: booking._id,
      user: {
        name: session?.user?.name,
        email: session?.user?.email,
        contact: session?.user?.phone,
      },
    });

    const order = res.data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      name: "MS Enclave Resort Palakkad",
      description: `Booking #${booking._id}`,
      order_id: order.id,
      prefill: {
        name: session?.user?.name,
        email: session?.user?.email,
        contact: session?.user?.phone || "",
      },
      handler: async function (response: any) {
        await axios.post("/api/bookings/confirm-payment", {
          bookingId: booking._id,
          paymentMethod: "razorpay",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        });

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        toast.success("Your Booking request has been submitted successfully. We will contact you shortly.", {
          position: "top-center",
          duration: 5000, // ⏱ hide after 3 seconds
        });
        
        router.push(`/my-bookings/`);
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast.error("Payment failed. Please try again.");
    router.push(`/my-bookings/`);
  }
};

  // ---------- STRIPE PAYMENT ----------
  const handleStripePayment = async (booking: any) => {
    try {
      const res = await axios.post("/api/payments/stripe", {
        amount: booking.totalPrice,
        currency: "USD",
        bookingId: booking._id,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Stripe payment failed:", err);
      alert("Failed to initiate Stripe payment");
    }
  };

  const getCheckoutDate = (checkIn: string, nights: number) => {
    const date = new Date(checkIn);
    date.setDate(date.getDate() + nights);
    return date.toISOString();
  };

  // ---------- INPUT CHANGE ----------
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (value < 0) return;

    const updated = { ...form, [name]: value };

    const adults = Number(name === "adults" ? value : form.adults);
    const children = Number(name === "children" ? value : form.children);

    const roomsNeeded = Math.max(
      Math.ceil(adults / pkg.maxAdults),
      Math.ceil(children / pkg.maxChildren)
    );

    if (roomsNeeded > maxAvailableRooms) {
      setWarning(
        "Maximum Online Room Availability Reached. Please contact M.S. Enclave +91 974 566 6642"
      );
      return;
    }
    setWarning("");
    setForm(updated);
    calculateBooking(updated);
  };

  // ---------- CALCULATE BOOKING (WITH GST) ----------
  const calculateBooking = (formData: any) => {
    const adults = Number(formData.adults);
    const children = Number(formData.children);

    if (!adults) return;

    const maxA = pkg.maxAdults;
    const maxC = pkg.maxChildren;

    const roomsForAdults = Math.ceil(adults / maxA);
    const roomsForChildren = Math.ceil(children / maxC);

    let rooms = Math.max(roomsForAdults, roomsForChildren);

    if (rooms > maxAvailableRooms) {
      setWarning(
        "Maximum room availability reached. Please contact M.S. Enclave."
      );
      return;
    }

    setWarning("");
    setRoomsNeeded(rooms);

    // 🔥 Avoid session null error
    if (!session?.user) return;

    // 🔥 Select price based on nationality
    // const price =
    const price = pkg.indianPrice;

    // 🔥 Calculate base price using nights
    const baseAmount = rooms * price * nights;

    // 🔥 Apply GST (option B: for ALL users)
    setTotalPrice(applyGST(baseAmount));
  };

  // ---------- NIGHTS CHANGE (WITH GST) ----------
  const handleNightChange = (e: any) => {
    const value = Number(e.target.value);
    setNights(value);

    if (form.date) {
      fetchAvailability(form.date, value);
    } else {
      toast.error("Please Select Date");
      return;
    }

    // 🔥 Avoid null error
    if (!session?.user) return;

    if (roomsNeeded > 0) {
      // 🔥 Choose price based on nationality
      const price = pkg.indianPrice;

      // 🔥 Calculate base amount with nights
      const baseAmount = roomsNeeded * price * value;

      // 🔥 Apply GST (Option B — for all users)
      setTotalPrice(applyGST(baseAmount));
    }
  };

  // ---------- Stay Type Change ----------
  const handleStayTypeChange = (e: any) => {
    const value = e.target.value;
    setStayType(value);

    if (!session || !session.user) return; // 🔥 FIXED

    if (value === "single") {
      setNights(1);

      if (roomsNeeded > 0) {
        const price =
          session.user.nationality === "India"
            ? pkg.indianPrice
            : pkg.foreignPrice;

        const baseAmount = roomsNeeded * price;

        setTotalPrice(applyGST(baseAmount)); // GST for everyone
      }
    }
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage("");
    const checkInDate = new Date(form.date);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + nights);

    if (!session?.user?.id) return router.push("/login");

    if (!totalPrice) {
      toast.error("Please Fill All Fields");
      return;
    }

    try {
      const res = await axios.post("/api/bookings", {
        ...form,
        userId: session.user.id,
        packageId: pkg._id,
        roomsNeeded,
        totalPrice,
        nights,
        checkInDate,
        checkOutDate,
        status: "pending",
      });

      const booking = res.data;

      if (session.user.nationality === "India") {
        await handleRazorpayPayment(booking);
      } else {
        await handleRazorpayPayment(booking);
        // await handleStripePayment(booking);
      }
      

    } catch (err) {
      console.error(err);
      // setMessage("❌ Booking failed.");
    }
    setIsSubmitting(false);

  };

  if (loading) return <p className="p-10">Loading package...</p>;
  if (!pkg) return <p className="p-10 text-red-600">Package not found.</p>;

  return (
    <>
    {/* 🎉 CONFETTI */}
              {showConfetti && (
          <ConfettiOverlay show={showConfetti} />
        
        
        )}
        <div className="max-w-6xl mx-auto p-6  py-20">
      {/* Heading SIDE */}
      <div className="mb-7">
        <h1 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
          {pkg.packageName}
        </h1>
        {session?.user ? (
          <p className="text-2xl text-white font-dm text-shadow-sm">
            ₹{pkg.indianPrice} / Night
          </p>
        ) : (
          <div>
            <p className="text-2xl text-white font-dm text-shadow-sm">
              ₹{pkg.indianPrice} / Night
            </p>
            <p className=" text-red-500 pl-1  text-lg  font-dm font-medium ">
              Login to Book You Room
            </p>
          </div>
        )}
      </div>

      <div className="grid  md:grid-cols-10 gap-10">
        {/* LEFT SIDE */}
        <div className="md:col-span-6 order-2 md:order-1">
          <div className="relative w-full h-96 overflow-hidden rounded-md transition">
            <Image
              src={pkg.image}
              alt={pkg.packageName}
              fill
              className="object-cover rounded-lg shadow"
            />
          </div>

          <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">
            {pkg.description}
          </p>

          <RoomHighlights
            beds={1}
            bedType="King Size Bed"
            maxAdults={pkg.maxAdults}
            maxChildren={pkg.maxChildren}
            roomSize="45 sqm"
          />
          <RoomRules />
          <Amenities />
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-4 rounded-xl order-1 md:order-2">
          <div className="shadow-2xl bg-red rounded-xl border-amber-100 p-6 sticky top-20">
            <h2 className="text-3xl font-semibold text-yellow-100 font-dm  leading-tight text-shadow-sm mb-2">Booking Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4 font-dm">
              <p className="text-lg text-shadow-lg text-yellow-100 font-bold mt-4 font-dm ">Select Date</p>

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Select Date"
                required
                className="w-full p-3 border-b rounded"
              />

              <p className="text-lg font-semibold font-dm text-center">
                {maxAvailableRooms > 0 ? (
                  <span className="text-green-400">
                    {maxAvailableRooms}  Rooms Available
                  </span>
                ) : (
                  <span className="text-red-600">
                    <span className="text-lg"> No rooms available. </span>{" "}
                    <br />
                    <span className="text-sm">
                      Kindly Asking, Please change dates or contact us.
                    </span>
                  </span>
                )}
              </p>

              <div className="flex justify-between">
                <p className="text-lg text-shadow-lg text-yellow-100 font-bold mt-4 font-dm ">
                  Person Details
                </p>
                <Link
                  href={`/profile?callbackUrl=${encodeURIComponent(
                    currentPath
                  )}`}
                  className="text-md shadow hover:animate-bounce font-bold bg-white rounded text-black text-shadow-md px-4 py-1 mt-4 font-dm"
                >
                  Edit
                </Link>
              </div>

              <div className="space-y-1">

  <div className="grid grid-cols-3 items-center gap-3">
    <label className="text-gray-50 font-normal">Full Name</label>
    <input
      name="fullName"
      value={form.fullName}
      disabled
      className="col-span-2 w-full font-medium p-3 rounded cursor-not-allowed"
    />
  </div>

  <div className="grid grid-cols-3 items-center gap-3">
    <label className="text-gray-50 font-normal">Email</label>
    <input
      name="email"
      value={form.email}
      disabled
      className="col-span-2 w-full font-medium p-3 rounded cursor-not-allowed"
    />
  </div>

  <div className="grid grid-cols-3 items-center gap-3">
    <label className="text-gray-50 font-normal">Nationality</label>
    <input
      name="nationality"
      value={session?.user?.nationality || ""}
      disabled
      className="col-span-2 w-full font-medium p-3 rounded cursor-not-allowed"
    />
  </div>

  <div className="grid grid-cols-3 items-center gap-3">
    <label className="text-gray-50 font-normal">Phone</label>
    <input
      name="phone"
      value={form.phone}
      disabled
      className="col-span-2 w-full font-medium p-3 rounded cursor-not-allowed"
      required
    />
  </div>

</div>

              <p className="text-lg text-shadow-lg text-yellow-100 font-bold mt-6 font-dm ">
                Add Your Booking Details
              </p>

              <div className="grid grid-cols-3 items-center gap-3">
  <label className="text-white font-medium">Adults</label>
  <input
    name="adults"
    type="number"
    min="1"
    disabled={noRooms}
    value={form.adults}
    onChange={handleChange}
    placeholder="Number of Adults"
    required
    className="col-span-2 w-full p-3 border-b rounded"
  />
</div>

<div className="grid grid-cols-3 items-center gap-3">
  <label className="text-white font-medium">Children</label>
  <input
    name="children"
    type="number"
    min="0"
    disabled={noRooms}
    value={form.children}
    onChange={handleChange}
    placeholder="Number of Children"
    className="col-span-2 w-full p-3 border-b rounded"
  />
</div>

              {warning && (
                <p className="text-red-600 bg-red-100 p-2 rounded mt-2 text-sm">
                  {warning}
                </p>
              )}

              {/* Stay Type */}
              <div className="space-y-2">
                <p className="text-lg text-shadow-lg text-yellow-100 font-bold mt-6 font-dm ">Stay Duration</p>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stayType"
                    value="single"
                    checked={stayType === "single"}
                    onChange={handleStayTypeChange}
                  />
                  One Night
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stayType"
                    value="multiple"
                    disabled={noRooms}
                    checked={stayType === "multiple"}
                    onChange={handleStayTypeChange}
                  />
                  Multiple Nights
                </label>
              </div>

              {stayType === "multiple" && (
                <div>
                  <label className="block font-semibold mb-1">
                    Number of Nights
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={nights}
                    onChange={handleNightChange}
                    className={`w-full p-3 border rounded
        ${!form.date ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />

                  {!form.date && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select a check-in date first
                    </p>
                  )}
                </div>
              )}

              {roomsNeeded > 0 && session?.user && (
                <div className="bg-gray-100/5 p-4 rounded-lg shadow-2xl">
                  <p>
                    <strong>Rooms Needed:</strong> {roomsNeeded}
                  </p>

                  {/* Determine price & currency */}
                  {(() => {
                    // const isIndian = session.user.nationality === "India";
                    const isIndian = true;
                    const price = isIndian ? pkg.indianPrice : pkg.foreignPrice;
                    const currency = isIndian ? "₹" : "$";
                    const baseAmount = roomsNeeded * price * nights;
                    const gstAmount = baseAmount * 0.18;

                    return (
                      <>
                        {/* Base Price */}
                        <p>
                          <strong>Base Price:</strong> {currency}
                          {baseAmount}
                        </p>

                        {/* GST */}
                        <p>
                          <strong>GST (18%):</strong> {currency}
                          {gstAmount.toFixed(2)}
                        </p>

                        {/* Total Price */}
                        <p>
                          <strong>Total Price (With GST):</strong> {currency}
                          {totalPrice}
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}

              <button
                type="submit"
                disabled={noRooms}
                className={`w-full py-3 rounded-lg text-white mt-2 ${
                  noRooms
                    ? "bg-red-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:animate-bounce"
                }`}
              >
                {noRooms ? "No Rooms Available for Booking" : "Submit Booking"}
              </button>
            </form>

            {message && <p className="text-center mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}
