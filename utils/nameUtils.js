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
            let response = await wrapName(provider, ...args)
            if (response && response.wait) {
                const toastId = toast.loading('Transaction pending...');
                const receipt = await response.wait();
                toast.dismiss(toastId);
                return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
              } else {
                return(response)
              }
        }
        if(args[0] == undefined){
            let response = await lnr[functionName]();
            if (response && response.wait) {
                const toastId = toast.loading('Transaction pending...');
                const receipt = await response.wait();
                toast.dismiss(toastId);
                return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
              } else {
                return(response)
              }
        }
        else{
            let response = await lnr[functionName](...args);
            if (response && response.wait) {
                const toastId = toast.loading('Transaction pending...');
                const receipt = await response.wait();
                toast.dismiss(toastId);
                return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
              } else {
                return(response)
              }
        }

      } catch (error) {

        //toast.error(handleEthersError(error?.reason)); // Display error notification using react-hot-toast
        console.log(error); // Re-throw the error for further handling
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
    
    try{
        const lnr = new LNR(ethers, provider);
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


export async function transferByTokenId(signer, fromAddress, toAddress, tokenId){
    const lnr = new LNR(ethers, signer)
    try{
        console.log("invoking transder")
        let response =  await lnr.wrapperContract.transferFrom(fromAddress, toAddress, tokenId)
        console.log(response)
        if (response && response.wait) {
            const toastId = toast.loading('Transaction pending...');
            const receipt = await response.wait();
            toast.dismiss(toastId);
            return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
          } else {
            return(response)
          }

    } catch (e){
        toast.error(handleEthersError(error?.reason)); // Display error notification using react-hot-toast
        return(e)
    }
}

export async function transferByDomainBytecode(signer, toAddress, domainBytecode){
    const lnr = new LNR(ethers, signer)
    try{
        let response =  await lnr.linageeContract.transfer(domainBytecode, toAddress)
        if (response && response.wait) {
            const toastId = toast.loading('Transaction pending...');
            const receipt = await response.wait();
            toast.dismiss(toastId);
            return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
          } else {
            return(response)
          }

    } catch (error){
        toast.error(handleEthersError(error?.reason)); // Display error notification using react-hot-toast
        return(e)
    }
}



export async function resolveOrReturn(signer, addressOrName){
    const lnr = new LNR(ethers, signer)
    try {

        if(ethers.utils.isAddress(addressOrName)){
          return(addressOrName)
        }
        else{
            let nameArg
            if(addressOrName.endsWith(".og")){
              nameArg = addressOrName
              }
            else{
              nameArg = addressOrName + ".og"
            }
            let addressResponse = await lnr.resolveName(nameArg)
            if(ethers.utils.isAddress(addressResponse)){
                return(addressResponse)
            }
            else{
                return(undefined)
            }
        }
      
      } catch (error) {
        
        return(undefined)
      }
}


  export async function handleTextRecord(provider, functionName, _name, key, value = undefined) {
        try {
            const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"controller","type":"address"}],"name":"NewController","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"primary","type":"address"}],"name":"NewPrimary","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"string","name":"key","type":"string"},{"indexed":true,"internalType":"string","name":"value","type":"string"}],"name":"SetTextRecord","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"getResolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"string","name":"_key","type":"string"}],"name":"getTextRecord","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lnrAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"primary","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_domain","type":"string"}],"name":"resolve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"resolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"setPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"string","name":"_key","type":"string"},{"internalType":"string","name":"_value","type":"string"}],"name":"setTextRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"unsetController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unsetPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"string","name":"_key","type":"string"}],"name":"unsetTextRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"userTextRecords","outputs":[{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_addr","type":"address"}],"name":"verifyIsNameOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
            const contract = new ethers.Contract(LNR.RESOLVER_ADDRESS, abi, provider);

            if(_name.endsWith(".og")){
                _name = _name.slice(0,-3)
            }
            const parsedName = ethers.utils.formatBytes32String(_name);

            if(functionName == "getTextRecord"){
                let response = await contract[functionName](parsedName, key);
                return(response)
            }
            if(functionName == "unsetTextRecord"){
                let response = await contract[functionName](parsedName, key);
                if (response && response.wait) {
                    const toastId = toast.loading('Transaction pending...');
                    const receipt = await response.wait();
                    toast.dismiss(toastId);
                    return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
                  } else {
                    return(response)
                  }
            }

            if(functionName == "setTextRecord"){
                let response = await contract[functionName](parsedName, key, value);
                if (response && response.wait) {
                    const toastId = toast.loading('Transaction pending...');
                    const receipt = await response.wait();
                    toast.dismiss(toastId);
                    return(receipt.status === 1 ? 'Transaction Successful' : 'Transaction Failed');
                  } else {
                    return(response)
                  }
            }
            return(undefined)


      
      } catch (error) {
        console.log("error ", error)
        return(undefined)
      }
  }


export function checkValid(nameString){
    const lnr = new LNR(ethers, undefined)

    try{

        let isValid = lnr.isNormalizedName(nameString)
        if(isValid ){
            return(isValid)
        } else{
            return(false)
        }

    } catch(e){
        console.log(e)
        return(false)
    }

}


export async function checkOwner(signer, name){

    try{
        let ownerResp = await callLnrClass(signer, "owner", name)
        console.log(ownerResp)
        if(ownerResp && ownerResp.length==2 && !ethers.utils.isAddress(ownerResp[0])){
            return(false)
        }
        if(ownerResp && ownerResp.length==2 && ethers.utils.isAddress(ownerResp[0])){
            return(true)
        }
        else{
            return(false)
        }

    } catch(e){
        toast.error("Error checking owner")
        return(true)    
    }

}

