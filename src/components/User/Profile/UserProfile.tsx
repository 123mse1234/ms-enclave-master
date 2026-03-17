"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/common/Breadcrumb";
import NationalitySelector from "@/components/common/NationalitySelector";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { validateUserProfile } from "@/utils/validateUserProfile";

interface Profile {
  name: string;
  phone: string;
  nationality: string;
  address: string;
  image: string;
}

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Profile>({
    name: "",
    phone: "",
    nationality: "",
    address: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error('Please Log In')
      router.push("/login");
    }

    if (session?.user) {
      validateUserProfile(session.user);

      const { name, phone, nationality, address, image } = session.user as any;

      if (phone || nationality || address) {
        setProfile({ name, phone, nationality, address, image });
        
        setIsEditing(false);
      } else {
        setForm({
          name: name || "",
          phone: "",
          nationality: "",
          address: "",
          image: image,
        });
      }
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!session?.user?.email) return;

  // ✅ VALIDATION START
  if (!form.name.trim()) {
    toast.error("Name is required");
    return;
  }

  if (form.phone.trim().length < 10) {
    toast.error("Phone number must be at least 10 digits");
    return;
  }

  if (!form.nationality.trim()) {
    toast.error("Please select nationality");
    return;
  }

  if (form.address.trim().length < 5) {
    toast.error("Address must be at least 5 characters");
    return;
  }
  // ✅ VALIDATION END

  try {
    const { data } = await axios.post("/api/profile", {
      email: session.user.email,
      ...form,
    });

    session.user.id = data.user._id.toString();
    session.user.phone = data.user.phone || "";
    session.user.nationality = data.user.nationality || "India";
    session.user.address = data.user.address || "";

    setProfile(form);
    setIsEditing(false);
    router.push(callbackUrl || "/profile");

    toast.success("Profile Edited successfully");
  } catch (error) {
    toast.error("Profile Edited Error");
  }
};

  const handleEdit = () => {
    if (profile) setForm(profile);
    setIsEditing(true);
  };

  if (status === "loading") return <Loader />;

  return (
    <>
      <div className="mx-auto px-0 md:px-10">
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl shadow-lg p-8 mx-auto space-y-6 font-dm"
          >
            <div className="text-center">
              <h2 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
                Personal Details
              </h2>
              <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">
                View and update your personal details, contact information, and preferences to ensure a smooth and personalized resort experience.
              </p>
            </div>
            {/* NAME */}
            <div>
              <Image
                src={form.image || "/images/default-avatar.png"}
                alt="Profile image"
                width={70}
                height={70}
                className="rounded-full my-5"
              />
              <label className="block text-lg font-medium text-yellow-100  mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border-b border-gray-300 text-lg font-semibold px-4 py-2
                            focus:outline-none
                            focus:border-b-2
                            focus:border-yellow-100
                            "
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-lg font-medium text-yellow-100  mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border-b border-gray-300 text-lg font-semibold px-4 py-2
                            focus:outline-none
                            focus:border-b-2
                            focus:border-yellow-100"
                required
              />
            </div>

            {/* NATIONALITY */}
            <div>
              <label className="block text-lg font-medium text-yellow-100  mb-1">
                Nationality
              </label>
              <div className="w-full border-b border-gray-300 text-lg font-semibold px-4 py-2
focus:outline-none
focus:border-b-2
focus:border-yellow-100">
                <NationalitySelector
                  value={form.nationality}
                  onChange={(label) => setForm({ ...form, nationality: label })}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-lg font-medium text-yellow-100  mb-1">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
                rows={2}
                className="w-full border-b border-gray-300 text-lg font-semibold px-4 py-2
                            focus:outline-none
                            focus:border-b-2
                            focus:border-yellow-100 resize-none"
                required
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 pt-4">
              <button
              onClick={() => setIsEditing(false)}
                type="button"
                className="px-6 py-2 rounded-lg border blgder-gray-300 text-yellow-100  hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 text-black  text-lg">
            <div className="text-center">
              <h2 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
                Personal Details
              </h2>
              <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
                View and update your personal details, contact information, and preferences to ensure a smooth and personalized resort experience.
              </p>
            </div>
            <div className="font-dm px-4 sm:px-10">

  {/* TOP SECTION */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between">

    {/* Profile Image */}
    <Image
      src={profile?.image || ""}
      alt="Profile image"
      width={70}
      height={70}
      className="rounded-full my-5"
    />

    {/* Edit Button */}
    <button
      onClick={handleEdit}
      className="
        mt-3 md:mt-0
        px-5 py-2
        rounded
        bg-white text-black font-semibold
        hover:bg-blue-600 hover:text-white
        transition
        self-start md:self-auto
      "
    >
      Edit Profile
    </button>

  </div>

  {/* TABLE DETAILS */}
  <table className="w-full">
    <tbody className="divide-y divide-yellow-50/10 px-10 capitalize">

      <tr className="hover:shadow-lg transition">
        <td className="py-4 text-lg text-white font-light w-1/3">
          Name
        </td>
        <td className="py-4 text-lg text-white font-medium">
          {profile?.name || "-"}
        </td>
      </tr>

      <tr className="hover:shadow-lg transition">
        <td className="py-4 text-lg text-white font-light">
          Phone Number
        </td>
        <td className="py-4 text-lg text-white font-medium">
          {profile?.phone || "-"}
        </td>
      </tr>

      <tr className="hover:shadow-lg transition">
        <td className="py-4 text-lg text-white font-light">
          Nationality
        </td>
        <td className="py-4 text-lg text-white font-medium">
          {profile?.nationality || "-"}
        </td>
      </tr>

      <tr className="hover:shadow-lg transition">
        <td className="py-4 text-lg text-white font-light">
          Address
        </td>
        <td className="py-4 text-lg text-white font-medium">
          {profile?.address || "-"}
        </td>
      </tr>

    </tbody>
  </table>

</div>
          </div>
        )}
      </div>
    </>
  );
}
