import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const geistSans = Prompt({
  variable: "--font-geist-sans",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Taks Manager App",
  description: "บันทึก จัดการงาน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-sans bg-gray-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
