"use client"

import { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { toast } from 'react-hot-toast';

const EthersProviderContext = createContext(null);

const useEthers = () => {
    const context = useContext(EthersProviderContext);
  
    if (!context) {
      throw new Error('useEthers must be used within EthersProvider');
    }
  
    const { walletProvider, connectWallet } = context;
  
    return { walletProvider, connectWallet };
  };
  

function EthersProvider ({ children }){
  const [walletProvider, setProvider] = useState(null);
  const { walletProvider: web3Provider } = useWeb3ModalProvider()

  useEffect(() => {
    const checkBrowserProvider = async () => {

        if(walletProvider){
            return
        }
       
        if(web3Provider){
            setProvider(walletProvider)
            return walletProvider
        }
        
        if (typeof window !== "undefined" && window.ethereum) {
            try {
            let providerResp = new ethers.providers.Web3Provider(window.ethereum);
            if(providerResp){
                console.log(`Connected to network using injected`);
                setProvider(providerResp);
                return providerResp;
            }
            return
            
            } catch (error) {
            console.error("Error connecting to browser walletProvider:", error);
            return
            }
        }
    };

    const tryRpcEndpoints = async (endpoints) => {
      for (const endpoint of endpoints) {
        try {
          const walletProvider = new ethers.providers.JsonRpcProvider(endpoint);
          const network = await walletProvider.getNetwork();
          console.log(`Connected to network: ${network.name} using ${endpoint}`);
          setProvider(walletProvider);
          return;
        } catch (error) {
          console.error(`Error connecting to endpoint ${endpoint}:`, error);
        }
      }
    };

    const rpcEndpoints = [
      // Replace these with your desired RPC endpoints (e.g., Infura, Alchemy)
      "https://eth.llamarpc.com",
      "https://eth-mainnet.public.blastapi.io",
      "https://rpc.ankr.com/eth",
      "https://rpc.flashbots.net/",
      "https://cloudflare-eth.com/",
      "https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79",
      "https://ethereum.publicnode.com",
      "https://nodes.mewapi.io/rpc/eth",
      "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",

    ];

    checkBrowserProvider().then((receivedProvider) => {
        if (!receivedProvider) {
            console.log("Now trying rpcs")
          tryRpcEndpoints(rpcEndpoints);
        }
      });;

  }, []);

  const connectWallet = async () => {
    console.log("Please connect ")
    toast.error("Please connect wallet to explore")
    return
    if (window.ethereum) {
      try {
        const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
        await walletProvider.send("eth_requestAccounts");
        setProvider(walletProvider);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Please connect your wallet to use this application.");
      }
    } else {
      alert("Please install a wallet like MetaMask to use this application.");
    }
  };

  const value = walletProvider ? { walletProvider, connectWallet } : { connectWallet };

  return (
    <EthersProviderContext.Provider value={value}>
      {children}
    </EthersProviderContext.Provider>
  );
};

export { EthersProvider, useEthers };
