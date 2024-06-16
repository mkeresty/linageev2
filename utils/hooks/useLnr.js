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
      //let ethersProvider = new ethers.providers.AlchemyProvider("homestead", [process.env.NEXT_PUBLIC_ALCHEMY_API_KEY])
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
  }, [addressOrName, walletProvider ]); 


  return { name, address, loading, error };
}

export function useLnrName(bytes) {
  const [name, setName] = useState(undefined); // Initialize empty object for responses
  const [domain, setDomain] = useState(undefined)
  const [domainUtf8, setDomainUtf8] = useState(undefined); // Initialize empty object for responses
  const [wrapped, setWrapped] = useState(undefined); // Initialize empty object for responses
  const [tokenId, setTokenId] = useState(undefined); // Initialize empty object for responses
  const [owner, setOwner] = useState(undefined); // Initialize empty object for responses
  const [primary, setPrimary] = useState(undefined); // Initialize empty object for responses
  const [controller, setController] = useState(undefined); // Initialize empty object for responses
  const [hydrated, setHydrated] = useState(undefined); // Initialize empty object for responses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const { walletProvider } = useWeb3ModalProvider();



  useEffect(() => {
    const fetchData = async () => {
      if(!walletProvider){
        console.log("No provider", walletProvider)
        return
      }
      let ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      //let ethersProvider = new ethers.providers.AlchemyProvider("homestead", [process.env.NEXT_PUBLIC_ALCHEMY_API_KEY])
      let ethersSigner = ethersProvider.getSigner()
      let provider = undefined
      if(ethersSigner){
        provider = ethersSigner
      } else if(ethersProvider) {
        provider = ethersProvider
      } else{
        console.log("No provider")
      }
      setLoading(true);
      setError(null);


      

      try {
            let hyd =  hydrateNames([{"domainBytecode": bytes}])
            if(hyd){
              setHydrated(hyd[0])
            }

            let domainResp = await callLnrClass(provider, "bytes32ToDomain", bytes)
            console.log("domain resp , ", domainResp)
            if(domainResp){
              setName(domainResp)
              setDomainUtf8(domainResp.slice(0, -3))
              let prmry = await callLnrClass(provider, "resolveName", domainResp)
              setPrimary(prmry)
            }
            
            let ownr = await getOwner(provider, bytes)
            console.log("owner ", ownr)
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
  }, [bytes, walletProvider ]); 


  return { domain, name, domainUtf8, domainBytecode: bytes, valid: hydrated?.valid, normalized: hydrated?.normalized, wrapped, tokenId, owner, primary, controller, loading, error };
}

export function useLnrCallOld(functionName, ...args) {
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


export function useLnrCall(functionName, timeout = 10000, ...args) {
  const [data, setData] = useState(undefined); // Holds data or transaction object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const { walletProvider } = useWeb3ModalProvider(); // Assuming this fetches the provider

  useEffect(() => {
    const fetchData = async () => {
      let ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      let ethersSigner = ethersProvider.getSigner();
      let provider = undefined;

      if (ethersSigner) {
        provider = ethersSigner;
      } else if (ethersProvider) {
        provider = ethersProvider;
      } else {
        console.log("no provider");
        setError(new Error('No provider available')); // Set error if no provider
        return; // Exit if no provider
      }

      setLoading(true);
      setError(null);

      const timeoutId = setTimeout(() => {
        setError(new Error('Transaction Timeout'));
        setLoading(false);
      }, timeout);

      try {
        const shouldUseCurrentUser = args.includes('currentUser');

        if (shouldUseCurrentUser && !ethersSigner) {
          throw new Error('User is not logged in'); // Throw error if currentUser and no signer
        }

        const providerToUse = shouldUseCurrentUser ? await ethersSigner.getAddress() : provider;

        const response = await callLnrClass(providerToUse, functionName, ...(shouldUseCurrentUser ? [...args.filter(arg => arg !== 'currentUser')] : args));
        // Check if response is a transaction object
        if (response && response.wait) {
          const receipt = await response.wait();
          setData(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
        } else {
          setData(response); // Assume data for read-only calls
        }
      } catch (error) {
        console.error('Error calling LNR function:', error);
        setError(error);
      } finally {
        clearTimeout(timeoutId); // Clear timeout on completion
        setLoading(false);
      }
    };

    fetchData().catch(error => setError(error)); // Handle errors thrown inside fetchData
  }, [functionName, ...args, timeout]); // Re-run when functionName, args, or timeout change

  return { data, loading, error };
}





export function useLnrCallProvider(walletProvider, functionName, timeout = 10000, ...args) {
  const [data, setData] = useState(undefined); // Holds data or transaction object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      let ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      let ethersSigner = ethersProvider.getSigner();
      let provider = undefined;

      if (ethersSigner) {
        provider = ethersSigner;
      } else if (ethersProvider) {
        provider = ethersProvider;
      } else {
        console.log("no provider");
        setError(new Error('No provider available')); // Set error if no provider
        return; // Exit if no provider
      }

      setLoading(true);
      setError(null);

      const timeoutId = setTimeout(() => {
        setError(new Error('Transaction Timeout'));
        setLoading(false);
      }, timeout);

      try {
        const shouldUseCurrentUser = args.includes('currentUser');

        if (shouldUseCurrentUser && !ethersSigner) {
          throw new Error('User is not logged in'); // Throw error if currentUser and no signer
        }

        const providerToUse = shouldUseCurrentUser ? await ethersSigner.getAddress() : provider;

        const response = await callLnrClass(providerToUse, functionName, ...(shouldUseCurrentUser ? [...args.filter(arg => arg !== 'currentUser')] : args));
        // Check if response is a transaction object
        if (response && response.wait) {
          const receipt = await response.wait();
          setData(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
        } else {
          setData(response); // Assume data for read-only calls
        }
      } catch (error) {
        console.error('Error calling LNR function:', error);
        setError(error);
      } finally {
        clearTimeout(timeoutId); // Clear timeout on completion
        setLoading(false);
      }
    };

    fetchData().catch(error => setError(error)); // Handle errors thrown inside fetchData
  }, [functionName, ...args, timeout]); // Re-run when functionName, args, or timeout change

  return { data, loading, error };
}

