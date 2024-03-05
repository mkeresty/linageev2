
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {Providers} from "@/app/providers";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen mb-20 sm:mb-0 `}>
        <Providers>
          <Header />
          <div className={"mb-auto px-1 overflow-auto"}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
