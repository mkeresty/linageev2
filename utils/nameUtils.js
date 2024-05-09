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

export async function getController(provider, bytes){
    const lnr = new LNR(ethers, provider);

    try {
        var lnres = await lnr.resolverContract.Controller(bytes)
        if(lnres !== "0x0000000000000000000000000000000000000000" && ethers.utils.isAddress(lnres) == true){
            return(lnres)
        }
    }catch(error){
        return(undefined)
    }
    return(undefined)
}

export async function getOwner(provider, nameBytes){
    const lnr = new LNR(ethers, provider);
    try{
        return lnr.linageeContract.owner(nameBytes).then(function(result) {
        if (result === ethers.constants.AddressZero)
            return null;
        else {
            if (result !== "0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7") {
            return {owner: result, wrapped: "unwrapped", tokenId: undefined};
            } else {
            return lnr.wrapperContract.nameToId(nameBytes).then(function(tokenId) {
                return lnr.wrapperContract.ownerOf(tokenId).then(function(tokenOwner) {
                return {owner: tokenOwner, wrapped: "wrapped", tokenId: Number(tokenId._hex)};
                });
            });
            }
        }
        });
    } catch(error){
        return(undefined)
    }
  }
