import localFont from "next/font/local";
import { Lato } from "next/font/google";

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const myriadProBlack = localFont({
  src: [
    {
      path: "../public/assets/fonts/Myriad Pro Black.otf",
      weight: "400",
      style: "normal",
    },
  ],
});
