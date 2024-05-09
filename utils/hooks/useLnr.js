"use client";


import { ethers } from 'ethers';

import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { hydrateNames, getController , getOwner} from "@/utils/nameUtils";



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
      if(!walletProvider){
        return
      }
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

export function useLnrName(bytes) {
  const [name, setName] = useState(undefined); // Initialize empty object for responses
  const [domainUtf8, setDomainUtf8] = useState(undefined); // Initialize empty object for responses
  const [wrapped, setWrapped] = useState(undefined); // Initialize empty object for responses
  const [tokenId, setTokenId] = useState(undefined); // Initialize empty object for responses
  const [owner, setOwner] = useState(undefined); // Initialize empty object for responses
  const [primary, setPrimary] = useState(undefined); // Initialize empty object for responses
  const [controller, setController] = useState(undefined); // Initialize empty object for responses
  const [hydrated, setHydrated] = useState(undefined); // Initialize empty object for responses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("bytes", bytes)


  const { walletProvider } = useWeb3ModalProvider();



  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching")
      if(!walletProvider){
        console.log("no provider here")
        return
      }
      let ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      let ethersSigner = ethersProvider.getSigner()
      let provider = undefined
      if(ethersSigner){
        provider = ethersSigner
      } else if(ethersProvider) {
        provider = ethersProvider
      } else{
        console.log("no provider")
      }
      setLoading(true);
      setError(null);

      console.log("starting")

      

      try {
            let hyd =  hydrateNames([{"domainBytecode": bytes}])
            if(hyd){
              setHydrated(hyd[0])
            }

            let domain = await callLnrClass(provider, "bytes32ToDomain", bytes)
            if(domain){
              setName(domain)
              setDomainUtf8(domain.slice(0, -3))
              let prmry = await callLnrClass(provider, "resolveName", domain)
              setPrimary(prmry)
            }
            
            let ownr = await getOwner(provider, bytes)
            setOwner(ownr?.owner)
            setWrapped(ownr?.wrapped)
            setTokenId(ownr?.tokenId)


            let cntrlr = await getController(provider, bytes)
            setController(cntrlr)

       
      
      } catch (error) {
        console.error('Error calling LNR function:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bytes ]); 


  return { name, domainUtf8, domainBytecode: bytes, valid: hydrated?.valid, normalized: hydrated?.normalized, wrapped, tokenId, owner, primary, controller, loading, error };
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