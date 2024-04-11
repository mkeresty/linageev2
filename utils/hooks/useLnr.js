"use client";

import { useState, useContext, useEffect } from "react";
import { ethers } from 'ethers';



async function resolveOrReturn(nameAddress){
    if(ethers.utils.isAddress(nameAddress) == true){
        setOgAddress(nameAddress)
        let { name, error, hasError, loading } = useLnrGetPrimaryName(nameAddress);
        setOgName(name)
    }
    else{
        if(!nameAddress.endsWith(".og")){
          nameAddress = nameAddress + ".og"
        }
        const { address, error, hasError, loading } = useLnrGetAddress(nameAddress);
          if(ethers.utils.isAddress(address)){
              setOgAddress(address)
              setOgName(nameAddress)
          }
};
}


export function useLnr(nameOrAddress) {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [normalized, setNormalized] = useState(undefined);




  // Initialize state with current window width
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state
      setWidth(window.innerWidth);
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return width;
}