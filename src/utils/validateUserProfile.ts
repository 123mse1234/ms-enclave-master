import toast from "react-hot-toast";

export const validateUserProfile = (user: any): boolean => {
  if (!user) return false;

  const { phone, nationality, address } = user;

  if (!phone) {
    toast.error("Please fill your phone number");
    return false;
  }

  if (!address) {
    toast.error("Please fill your address");
    return false;
  }

  if (!nationality) {
    toast.error("Please fill your nationality");
    return false;
  }

  return true; // ✅ profile is complete
};
export const unAuthenticateUserProfile = () => {

    toast.error("Please Login and Submit Your Details");
    return false;

};
