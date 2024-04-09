'use client'

import {ThemeProvider} from 'next-themes'
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {NextUIProvider} from "@nextui-org/react";
import { LnrConfigProvider } from '@linagee/lnr-ethers-react';
import { Web3Modal } from '@/context/web3modal';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
//import { Contract, formatUnits } from 'ethers'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import ConnectModal from '@/components/Modals/Connect'
import { useWeb3Modal } from '@web3modal/ethers5/react'

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


export function Providers({children}) {
    const [mounted, setMounted] = useState(false);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider();
    

    const [provider, setProvider] = useState({provider: undefined});

    useEffect(() => {
        setMounted(true);
        //getProvider();
    }, [])


    useEffect(() => {
        console.log("wallet provider ", walletProvider)

        if (walletProvider) {
            const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
            console.log("provider ", ethersProvider)
            setProvider({provider: ethersProvider})
        } else{
            const p = new ethers.providers.AlchemyProvider("homestead",  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
            setProvider({provider: p})
        }
    }, [walletProvider])


    //const provider = connectToProvider();

    const config = {
        provider: new ethers.providers.AlchemyProvider("homestead",  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
    }



    // async function getProvider() {
    //     if (!isConnected){ 
    //         const { open } = useWeb3Modal();
    //         console.log("not connected")
    //         open()

    //     }
    
    //     const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
    //     console.log("provider ", ethersProvider)
    //     //const signer = await ethersProvider.getSigner()

    //     return({provider: ethersProvider})

    //   }


    if (!mounted) return null;

    return (
        <ThemeProvider enableSystem={true} attribute="class">
        <NextUIProvider>
            <Web3Modal>
            <LnrConfigProvider config={provider}>
                <ConnectModal isOpen={isOpen} onClose={onClose} />
                {children}
            </LnrConfigProvider>
            </Web3Modal>
        </NextUIProvider>
        </ThemeProvider>
    );
}