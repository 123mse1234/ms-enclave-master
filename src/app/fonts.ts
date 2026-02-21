import localFont from "next/font/local";

export const audreyFont = localFont({
  src: [
    {
      path: "../../public/fonts/Audrey/Audrey-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Audrey/Audrey-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Audrey/Audrey-BoldOblique.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-audrey",
});
