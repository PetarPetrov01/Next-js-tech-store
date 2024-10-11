import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/ui/header";
import {
  PT_Serif,
  Playfair_Display,
  Source_Sans_3,
} from "next/font/google";
import Footer from "./components/ui/footer";
import { AuthProvider } from "@/contexts/AuthProvider";

export const ptSerif = PT_Serif({ weight: ["400"], subsets: ["latin"] });
export const sourseSans = Source_Sans_3({
  weight: ["400","500", "600", "700"],
  subsets: ["latin"],
});
export const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tech Store",
    default: "Tech Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourseSans.className} min-h-[100vh]`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
