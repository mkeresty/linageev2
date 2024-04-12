"use client";

import { ethers } from 'ethers';

import { lnr, getAddress, getPrimaryName} from '@linagee/lnr-ethers-react';
import { toast } from 'react-hot-toast';
import LNR from "@/utils/lnrethers";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'



export function hydrateNames(items){

    if(!items){
        return []
    }
    return items.map((item) => {
        let normalized = false
        let valid = false
        try{
            normalized = lnr.utils.isNormalizedBytes(item?.domainBytecode || undefined)
            valid = isValidBytes(item?.domainBytecode)

        }
        catch(e){
            //console.log("error ", e)
        }   
        if(valid !== true){
            item.domainUtf8 = "INVALID"
        }
        else{
            item.normalized = normalized
            item.valid = valid 
        }

        return item

    })
}



export function isValidBytes(bytes){
    var domain = lnr.utils.bytes32ToDomain(bytes)
    try{
        var validName = lnr.utils.isValidDomain(domain); 
        return(validName)[0]
    }
    catch(e){
        return(false)
    }

}


export async function resolveOrReturnOld(walletProvider, nameAddress){

    if(walletProvider){
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
        console.log("provider in utils", ethersProvider)
    }

        if(ethers.utils.isAddress(nameAddress) == true){
            //let name = await lnr.getPrimaryName(nameAddress);
            //console.log("name", name)
    
        }
        else{
            if(!nameAddress.endsWith(".og")){
            nameAddress = nameAddress + ".og"
            }
            // const address = await lnr.getAddress(nameAddress);
            //   if(ethers.utils.isAddress(address)){
            //       //setOgName(nameAddress)
            //   }
    };
    }


export async function callLnrClass(provider, functionName, ...args){

    const lnr = new LNR(ethers, provider);


    try {
  
        const response = await lnr[functionName](...args);
        return response; // Return the successful response
      } catch (error) {
        toast.error(error.message); // Display error notification using react-hot-toast
        throw error; // Re-throw the error for further handling
      }


}

