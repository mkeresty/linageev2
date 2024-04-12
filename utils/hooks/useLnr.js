"use client";


import { ethers } from 'ethers';

import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'


import { useState, useEffect } from 'react';
import { callLnrClass } from "../nameUtils";

export function useLnrCall(functionName, ...args) {
  const [data, setData] = useState(undefined); // Initialize empty object for responses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const { walletProvider } = useWeb3ModalProvider();




  useEffect(() => {
    const fetchData = async () => {
      let ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      let ethersSigner = ethersProvider.getSigner()
      let provider = undefined
      if(ethersSigner){
        provider = ethersSigner
      } else if(ethersProvider) {
        provider = ethersProvider
      } else{
        // console.log("no provider")
      }
      setLoading(true);
      setError(null);

      try {
        const response = await callLnrClass(provider, functionName, ...args);
        setData(response);
      } catch (error) {
        console.error('Error calling LNR function:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [functionName, ...args]); 


  return { data, loading, error };
}