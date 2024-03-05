"use client";

import { lnr } from '@linagee/lnr-ethers-react';

export function isValidBytes(bytes){
    var isValid = false;
    var name = lnr.bytes32ToString(bytes)
    try{
        var validName = og.lnr.isValidDomain(name+'.og'); 
        //console.log(validName[1])
        //console.log(og.lnr.domainToBytes32(validName[1]));
        //console.log(bytes)
        if (lnr.domainToBytes32(validName[1]) === bytes){
            var isValid = true
        }
        console.log("valid", isValid)
    }
    catch(e){
        return(false)
    }
    return(isValid)
}