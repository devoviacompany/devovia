import localFont from "next/font/local";

export const cairo = localFont({
  src: [
    {
      path: "../../../../public/fonts/Cairo/Cairo-ExtraLight.ttf",
      weight: "200"
    },
    {
      path: "../../../../public/fonts/Cairo/Cairo-Light.ttf",
      weight: "300"
    },
    {
      path: "../../../../public/fonts/Cairo/Cairo-Regular.ttf",
      weight: "400"
    },
    {
      path: "../../../../public/fonts/Cairo/Cairo-Medium.ttf",
      weight: "500"
    },
    {
      path: "../../../../public/fonts/Cairo/Cairo-SemiBold.ttf",
      weight: "600"
    },
    {
      path: "../../../../public/fonts/Cairo/Cairo-Bold.ttf",
      weight: "700"
    },
    {
      path: "../../../../public/fonts/Cairo/Cairo-ExtraBold.ttf",
      weight: "800"
    },
    {
      path: "../../../../public/fonts/Cairo/Cairo-Black.ttf",
      weight: "900"
    },
  ],
  variable: "--font-cairo",
});

// Optionally, keep or remove the following if you want to use Google fonts as fallback
// import { Inter, Poppins } from "next/font/google";
// export const inter = Inter({
//     subsets: ["latin"],
//     variable: "--font-inter",
// });
