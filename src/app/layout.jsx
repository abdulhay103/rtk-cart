import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Redux-RTK-Cart",
  description: "Generated by create redux-next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="bottom-left" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
