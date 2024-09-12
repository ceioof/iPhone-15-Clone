import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Apple Clone",
  description: "iPhone 15 is out now lucky you",
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
