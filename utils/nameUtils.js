"use client";

import { ethers } from 'ethers';

import { lnr, getAddress, getPrimaryName} from '@linagee/lnr-ethers-react';
import { toast } from 'react-hot-toast';
import LNR from "@/utils/lnrethers";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { handleEthersError } from '@/utils/etherutils';
import { getCurrentSigner} from "@/utils/etherutils";


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
        if(functionName == "wrap"){
            var response = await wrapName(provider, ...args)
        }
        else{
            var response = await lnr[functionName](...args);
        }

        console.log("response ", response)
        if (response && response.wait) {
            const toastId = toast.loading('Transaction pending...');
            const receipt = await response.wait();
            toast.dismiss(toastId);
            return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
          } else {
            return(response)
          }
      } catch (error) {
        toast.error(handleEthersError(error?.reason)); // Display error notification using react-hot-toast
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

export async function wrapName(signer, nameBytes){
    const lnr = new LNR(ethers, signer)
    try{
        return await lnr.wrapperContract.wrap(nameBytes)

    } catch (e){
        return(e)
    }
}

export async function getOwner(provider, nameBytes){
    const lnr = new LNR(ethers, provider);
    try{
        return lnr.linageeContract.owner(nameBytes).then(function(result) {
        if (result === ethers.constants.AddressZero)
            return null;
        else {
            if (result !== LNR.WRAPPER_ADDRESS) {
            return {owner: result, wrapped: "unwrapped", tokenId: undefined};
            } else {
            return lnr.wrapperContract.nameToId(nameBytes).then(function(tokenId) {
                if(!Number(tokenId._hex)){
                    return lnr.wrapperContract.waitForWrap(nameBytes).then(function(waitForWrap){
                        if(waitForWrap){
                            return {owner: waitForWrap, wrapped: "In progress", tokenId: undefined}
                        }
                        else{
                            return {owner: undefined, wrapped: undefined, tokenId: undefined}
                        }
                    })
                    
                }
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



export async function getStatus(walletProvider, domain, bytes){

    let status = undefined
    let generalStatus = undefined
    let owner = undefined

    const {address, signer} = await getCurrentSigner(walletProvider)

    let ownerObj = await getOwner(signer, bytes)
    if(ownerObj && (ownerObj.owner == address || ownerObj.owner == LNR.WRAPPER_ADDRESS)){
        owner = ownerObj.owner
        generalStatus = ownerObj.wrapped
    }

    
    let waitForWrapInitial = await callLnrClass(signer, "waitForWrap", domain)

    if(waitForWrapInitial !== address && owner == address && generalStatus == "unwrapped"){
        status = "readyForCreateWrapper"
    }
    if(waitForWrapInitial !== address && owner == address && generalStatus == "wrapped"){
        status = "readyForUnwrap"
    }

    if(waitForWrapInitial == address && owner == address){
        status = "readyForTransfer"
    }
    if(waitForWrapInitial == address && generalStatus == "In progress"){
        status = "readyForWrap"
    }

    return(status)

}
