'use client'

import {ThemeProvider} from 'next-themes'
import {use, useEffect, useState} from "react";
import {ethers} from "ethers";
import { Toaster } from 'react-hot-toast';
import {NextUIProvider} from "@nextui-org/react";
 // Adjust the import path as necessary
 import { useWeb3Modal } from '@web3modal/wagmi/react'
 import { useWeb3 } from "@/context/ethersProvider";
 import { useAccount, useWalletClient } from "wagmi";



export function Providers({children}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) return null;



    return (
        <ThemeProvider enableSystem={true} attribute="class">
            
                <NextUIProvider>
                    <Toaster position="bottom-center"/>
                    {children}
                </NextUIProvider>
        
        </ThemeProvider>
    );
}