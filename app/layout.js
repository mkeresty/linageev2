
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import Footer from "@/components/Footer";
import NavbarExpandable from "@/components/Modals/NavbarExpandable";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import Web3ModalProvider from '@/context'

const inter = Inter({ subsets: ["latin"] });
 
export const metadata = {
  title: "Linagee Name Registrar",
  description: "Explore the Linagee Name Registrar and mint your own Linagee Name.",
}; 

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen mb-20 sm:mb-0 `}>
      <Web3ModalProvider initialState={initialState}> 
        <Providers>
          {/* <Header /> */}
          <NavbarExpandable />
          <div className={"mb-auto p-x-1 sm:p-x-0 overflow-auto"}>
            {children}
          </div>
          <Footer />
        </Providers>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
