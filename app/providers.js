'use client'

import {ThemeProvider} from 'next-themes'
import { Toaster } from 'react-hot-toast';
import {NextUIProvider} from "@nextui-org/react";


const rpcNodes = [
    //"https://cloudflare-eth.com",
    "https://ethereum-rpc.publicnode.com",
    "wss://ethereum-rpc.publicnode.com",
    "https://mainnet.gateway.tenderly.co",
    "wss://mainnet.gateway.tenderly.co",
    "https://rpc.blocknative.com/boost",
    "https://rpc.flashbots.net",
    "https://rpc.flashbots.net/fast",
    "https://rpc.mevblocker.io",
    "https://rpc.mevblocker.io/fast",
    "https://rpc.mevblocker.io/noreverts",
    "https://rpc.mevblocker.io/fullprivacy"
];




export function Providers({children}) {
 



    return (
        <ThemeProvider enableSystem={true} attribute="class">
        <NextUIProvider>
            <Toaster 
                position="bottom-center"
            />
    

                {children}
     
        </NextUIProvider>
        </ThemeProvider>
    );
}