import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Apple iPhone 15 Pro Max",
  description: "iPhone 15 Pro Max in Titanium",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black ${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
