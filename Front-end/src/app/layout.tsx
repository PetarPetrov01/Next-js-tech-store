import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/ui/header";
import { PT_Serif, Playfair_Display, Source_Sans_3 } from "next/font/google";
import Footer from "./components/ui/footer";
import { AuthProvider } from "@/contexts/AuthProvider";

export const ptSerif = PT_Serif({ weight: ["400"], subsets: ["latin"] });
export const sourseSans = Source_Sans_3({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans",
});
export const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
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
      <body
        className={`${sourseSans.className} ${playfairDisplay.variable} ${sourseSans.variable} flex flex-col min-h-[100vh]`}
      >
        <AuthProvider>
          <Header />
          <main className="bg-gradient-radial flex-1 from-new-midnight to-new-darkblue flex justify-center">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
