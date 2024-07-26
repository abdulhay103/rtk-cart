import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Redux-RTK-Cart",
  description: "Generated by create redux-next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Toaster position="bottom-left" />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
