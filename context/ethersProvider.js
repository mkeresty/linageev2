"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ethers } from "ethers";
import { WalletClient } from "viem";
import { useAccount, useWalletClient } from "wagmi";

// Create the context
const Web3Context = createContext(null);

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

// Function to convert wallet client to provider and signer
const clientToProviderSigner = async (client) => {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  };
  const provider = new ethers.providers.Web3Provider(transport, network);
  const signer = await provider.getSigner(account?.address);
  return { provider, signer };
};

// Web3Provider component
export const Web3Provider = ({ children }) => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (!walletClient) return;
    const { signer, provider } = await clientToProviderSigner(walletClient);
    setSigner(signer);
    setProvider(provider);
  };

  useEffect(() => {
    if (!isConnected) {
      open();
    }
  }, [isConnected, open]);

  useEffect(() => {
    if (isConnected && walletClient) {
      connectWallet();
    }
  }, [isConnected, walletClient]);

  return (
    <Web3Context.Provider value={{ signer, provider }}>
      {children}
    </Web3Context.Provider>
  );
};
