"use client";

import { lnr } from '@linagee/lnr-ethers-react';

export function isValidBytes(bytes){
    var isValid = false;
    var name = lnr.utils.bytes32ToDomain(bytes)
    try{
        var validName = lnr.utils.isValidDomain(name); 

        //console.log(og.lnr.domainToBytes32(validName[1]));
        //console.log(bytes)
        if (lnr.utils.domainToBytes32(validName[1]) === bytes){
            var isValid = true
        }
    }
    catch(e){
        return(false)
    }
    return(isValid)
}

export function hydrateNames(items){
    return items.map((item) => {
        let normalized = false
        let valid = false
        try{
            normalized = lnr.utils.isNormalizedBytes(item?.domainBytecode || undefined)
            valid = isValidBytes(item?.domainBytecode)
            console.log("result ",valid,  item.domainUtf8)
 

        }
        catch(e){
            //console.log("error ", e)
        }   
        if(valid !== true){
            item.domainUtf8 = "INVALID"
        }
        item.normalized = normalized
        item.valid = valid // isValidBytes(item?.domainBytecode || undefined)
        return item
    })
}