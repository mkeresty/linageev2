
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import Footer from "@/components/Footer";
import NavbarExpandable from "@/components/Modals/NavbarExpandable";
import WagmiModalProvider from "./wagmicontext";
import Web3ModalProvider from '@/context/web3modal'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
const inter = Inter({ subsets: ["latin"] });

import { EthersProvider } from "@/context/ethersProvider";
 
export const metadata = {
  title: "Linagee Name Registrar",
  description: "Explore the Linagee Name Registrar and mint your own Linagee Name.",
}; 

export default function RootLayout({ children }) {
  //const [initialState, setInitialState] = useState()
    // useEffect(() => {
  //   const initialStateResp = cookieToInitialState(config, headers().get('cookie'))
  //   setInitialState(initialStateResp)
  //   }, []);
  //let initialState = undefined


  const initialState = cookieToInitialState(config, headers().get('cookie'))
  //let headerCookie = headers().get('cookie')

  // // if(global?.window !== "undefined"){
  // //   initialState = cookieToInitialState(config, headers().get('cookie'))
  // // }

  // if (typeof localStorage !== 'undefined') {
  //   initialState = cookieToInitialState(config, headers().get('cookie'))
  // } else if (typeof sessionStorage !== 'undefined') {
  //   // Fallback to sessionStorage if localStorage is not supported
  //   initialState = cookieToInitialState(config, headers().get('cookie'))
  // } else {
  //   // If neither localStorage nor sessionStorage is supported
  //   console.log('Web Storage is not supported in this environment.');
  // }



  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen mb-20 sm:mb-0 `}>
      <Providers>
        <WagmiModalProvider initialState={initialState}>
        <EthersProvider>
        
          {/* <Header /> */}
          <NavbarExpandable />
          <div className={"mb-auto p-x-1 sm:p-x-0 overflow-auto"}>
            {children}
          </div>
          <Footer />
        
        </EthersProvider>
        </WagmiModalProvider>
        </Providers>
      </body>
    </html>
  );
}
