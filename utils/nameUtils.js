"use client";

import { lnr } from '@linagee/lnr-ethers-react';


export function hydrateNames(items){
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