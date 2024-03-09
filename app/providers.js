'use client'

import {ThemeProvider} from 'next-themes'
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import { LnrConfigProvider } from '@linagee/lnr-ethers-react';

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


async function connectToProvider() {
    let provider;
    for (const rpc of rpcNodes) {
        try {
            provider = new ethers.providers.JsonRpcProvider(rpc);
            // Test connection by fetching block number
            await provider.getBlockNumber();
            console.log(`Connected to ${rpc}`);
            //console.log(contract)
            return provider; // Return the provider if connection successful
        } catch (error) {
            console.error(`Failed to connect to ${rpc}: ${error.message}`);
        }
    }
    console.error('Unable to connect to any RPC node.');
    return null; // Return null if no provider was successfully connected
}

async function test(provider){
    const here = await provider.getBalance("keresty.eth");
    console.log("heree ", here)
}

export function Providers({children}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])


    //const provider = connectToProvider();

    const config = {
        provider: new ethers.providers.AlchemyProvider("homestead",  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
    }


    if (!mounted) return null;

    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <LnrConfigProvider config={config}>
                {children}
            </LnrConfigProvider>
        </ThemeProvider>
    );
}