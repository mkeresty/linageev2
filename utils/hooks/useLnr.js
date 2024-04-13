"use client";


import { ethers } from 'ethers';

import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'


import { useState, useEffect } from 'react';
import { callLnrClass } from "../nameUtils";

export function useGetAddress(addressOrName){
  if(ethers.utils.isAddress(addressOrName)){
    return addressOrName
  }
  else{
    let name
    if(addressOrName.endsWith(".og")){
      name = addressOrName
      }
    else{
      name = addressOrName + ".og"
    }
    return useLnrCall("resolveName", name)
  }

}


export function useLnrProfile(addressOrName) {
  const [name, setName] = useState(undefined); // Initialize empty object for responses
  const [address, setAddress] = useState(undefined); // Initialize empty object for responses
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

        if(ethers.utils.isAddress(addressOrName)){
          setAddress(addressOrName)
          let nameResponse = await callLnrClass(provider, "lookupAddress", addressOrName)
          setName(nameResponse)
        }
        else{
            let nameArg
            if(addressOrName.endsWith(".og")){
              nameArg = addressOrName
              }
            else{
              nameArg = addressOrName + ".og"
            }
            let addressResponse = await callLnrClass(provider, "resolveName", nameArg)
            if(ethers.utils.isAddress(addressResponse)){
              setAddress(addressResponse)
              setName(nameArg)
            }
            else{
              setAddress(undefined)
              setName(undefined)
            }
        }
      
      } catch (error) {
        console.error('Error calling LNR function:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addressOrName ]); 


  return { name, address, loading, error };
}

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