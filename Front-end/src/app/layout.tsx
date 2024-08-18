import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";
import { PT_Sans, PT_Serif } from "next/font/google";
import Footer from "./ui/footer";
import { AuthProvider } from "@/contexts/AuthProvider";

const ptSans = PT_Sans({ weight: ["400"], subsets: ["latin"] });
export const ptSerif = PT_Serif({ weight: ["400"], subsets: ["latin"] });

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
      <body className={`${ptSans.className} min-h-[100vh]`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
