"use client"

import { Fragment, useState, useEffect } from "react";
import { callLnrClass, getStatus } from "@/utils/nameUtils";
import { toast } from 'react-hot-toast';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { getCurrentSigner} from "@/utils/etherutils";
import LNR from "@/utils/lnrethers";


export default function Wrap({name}){
    const { walletProvider } = useWeb3ModalProvider();

    const [status, setStatus] = useState(undefined)
    const [loading, setLoading] = useState(true)

    const handleStatus = async() =>{
        setLoading(true)
        let statusResp = await getStatus(walletProvider, name.name, name.domainBytecode)
        setStatus(statusResp)
        setLoading(false)
        return
    }

    useEffect(()=>{
        if(name && name.name){
            handleStatus()
        }

    },[name])


    


    const createWrapper = async (domain) =>{
        setLoading(true)

        try{
            const {address, signer} = await getCurrentSigner(walletProvider)

            let statusResp = await getStatus(walletProvider, domain)
            if(statusResp !== "readyForCreateWrapper"){
                return(toast.error("Incorrect status, please reload or wait for any pending transactions"))
            }

            let data = await callLnrClass(signer, "createWrapper", domain)

            if(data == "Transaction Failed"){
                toast.error(data)
            }

            if(data == "Transaction Successful"){
                toast.success(data)

            }
            return(setLoading(false))

        } catch(e){
            //toast.error(`${e?.message}`)
            return(setLoading(false))
        }
        

    }

    
    async function transferToWrapper(domain){
        setLoading(true)
        try{
            const {address, signer} = await getCurrentSigner(walletProvider)



            let statusResp = await getStatus(walletProvider, domain)
            if(statusResp !== "readyForTransfer"){
                return(toast.error("Incorrect status, please reload or wait for any pending transactions"))
            }


            let data = await callLnrClass(signer, "transfer", LNR.WRAPPER_ADDRESS, domain)
            if(data == "Transaction Failed"){
                toast.error(data)
            }

            if(data == "Transaction Successful"){
                toast.success(data)

            }
            return(setLoading(false))


        } catch(e){
            console.log(e)
            toast.error(`${e.message}`)
            setLoading(false)
        }
    }


    const wrap = async (domain, domainBytecode) =>{
        setLoading(true)
        console.log("dommmm ", domain, domainBytecode)

        try{
            const {address, signer} = await getCurrentSigner(walletProvider)

            // const test = await callLnrClass(signer, "isUnwrappedOwner", domain)
            // console.log("test ", test)

            // let statusResp = await getStatus(walletProvider, domain)
            // if(statusResp !== "readyForWrap"){
            //     return(toast.error("Incorrect status, please reload or wait for any pending transactions"))
            // }


            let data = await callLnrClass(signer, "wrap", domain)

            if(data == "Transaction Failed"){
                toast.error(data)
            }

            if(data == "Transaction Successful"){
                toast.success(data)

            }
            return(setLoading(false))
        } catch(e){
            toast.error(`${e}`)
            setLoading(false)
        }

    }


    async function unwrap(domain){
        try{
            const {address, signer} = await getCurrentSigner(walletProvider)

            let statusResp = await getStatus(walletProvider, domain)
            if(statusResp !== "readyForUnwrap"){
                return(toast.error("Incorrect status, please reload or wait for any pending transactions"))
            }
            let data = await callLnrClass(signer, "unwrap",  domain)


            if(error || data == "Transaction Failed"){
                toast.error(`${error}` || "Transaction Failed")
            }
    
            if(!error && !loading && data == "Transaction Successful"){
                toast.success(data)
                return(true)
    
            }
        } catch(e){
            toast.error(`${e}`)
        }

    }





    return(
        <div className="w-full focus:outline-none focus:ring-0">
        
            <button disabled={!(status == "readyForCreateWrapper")} onClick={()=>createWrapper(name.name)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForCreateWrapper" || loading) ?"opacity-50" : ""}`}>Create Wrapper</button>
            <button disabled={!(status == "readyForTransfer")} onClick={()=>transferToWrapper(name.name)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForTransfer" || loading) ?"opacity-50" : ""}`}>Transfer to Wrapper</button>
            <button disabled={!(status == "readyForWrap")} onClick={()=>wrap(name.name, name.domainBytecode)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForWrap" || loading) ?"opacity-50" : ""}`}>Finalize Wrapper</button>
            <button disabled={!(status == "readyUnwrap")} onClick={()=>unwrap(name.name)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForUnwrap" || loading) ?"opacity-50" : ""}`}>Unwrap</button>

        
        </div>
    )
}