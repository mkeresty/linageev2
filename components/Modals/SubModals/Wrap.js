"use client"

import { Fragment, useState, useEffect } from "react";
import { callLnrClass, getStatus } from "@/utils/nameUtils";
import { toast } from 'react-hot-toast';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { getCurrentSigner} from "@/utils/etherutils";
import LNR from "@/utils/lnrethers";
import { IoIosGift } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { TbProgressBolt } from "react-icons/tb";
import { LuSparkles } from "react-icons/lu";
import { TbCubeSend } from "react-icons/tb";


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


    


    async function createWrapper(domain, domainBytecode){
        setLoading(true)

        try{
            const {address, signer} = await getCurrentSigner(walletProvider)

            let statusResp = await getStatus(walletProvider, domain, domainBytecode)
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



            let statusResp = await getStatus(walletProvider, domain, domainBytecode)
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
            return(setLoading(false))
        }
    }


    async function wrap(domain, domainBytecode){
        setLoading(true)
        console.log("dommmm ", domain, domainBytecode)

        try{
            const {address, signer} = await getCurrentSigner(walletProvider)

            let statusResp = await getStatus(walletProvider, domain, domainBytecode)
            if(statusResp !== "readyForWrap"){
                return(toast.error("Incorrect status, please reload or wait for any pending transactions"))
            }

            let data = await callLnrClass(signer, "wrap", domainBytecode)

            if(data == "Transaction Failed"){
                toast.error(data)
            }

            if(data == "Transaction Successful"){
                toast.success(data)

            }
            return(setLoading(false))
        } catch(e){
            return(setLoading(false))
        }

    }


    async function unwrap(domain, domainBytecode){
        try{
            const {address, signer} = await getCurrentSigner(walletProvider)

            let statusResp = await getStatus(walletProvider, domain, domainBytecode)
            if(statusResp !== "readyForUnwrap"){
                return(toast.error("Incorrect status, please reload or wait for any pending transactions"))
            }
            let data = await callLnrClass(signer, "unwrap",  domain)


            if(data == "Transaction Failed"){
                toast.error(data)
            }

            if(data == "Transaction Successful"){
                toast.success(data)

            }

        } catch(e){
            return(setLoading(false))
        }

    }





    return(
        // <div className="w-full focus:outline-none focus:ring-0">
        
        //     <button disabled={!(status == "readyForCreateWrapper")} onClick={()=>createWrapper(name.name, name.domainBytecode)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForCreateWrapper" || loading) ?"opacity-50" : ""}`}>Create Wrapper</button>
        //     <button disabled={!(status == "readyForTransfer")} onClick={()=>transferToWrapper(name.name, name.domainBytecode)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForTransfer" || loading) ?"opacity-50" : ""}`}>Transfer to Wrapper</button>
        //     <button disabled={!(status == "readyForWrap")} onClick={()=>wrap(name.name, name.domainBytecode)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForWrap" || loading) ?"opacity-50" : ""}`}>Finalize Wrapper</button>
        //     <button disabled={!(status == "readyUnwrap")} onClick={()=>unwrap(name.name, name.domainBytecode)} type="button" className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${(status !== "readyForUnwrap" || loading) ?"opacity-50" : ""}`}>Unwrap</button>

        
        // </div>

<div className="w-auto  px-15 mx-20 ">
<ol className="relative text-gray-500 p-4 my-4 dark:text-gray-400">                  
<li className="mb-8 ms-6" onClick={()=>createWrapper(name.name, name.domainBytecode)}>
        <span className={`${status == "readyForCreateWrapper" ? "bg-green-200":""}  absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}>
        <LuSparkles className="w-4 h-4" />
        </span>
        <div className={`${status == "readyForCreateWrapper" ? "bg-green-200 shadow-md animate-bounce hover:cursor-pointer":""} p-2 px-4 w-auto inline-block rounded-md `}>
        <h3 className="font-medium leading-tight">Create wrapper</h3>
        </div>    </li>
    <li className="mb-8 ms-6 " onClick={()=>transfer(name.name, name.domainBytecode)}>
    <span className={`${status == "readyForTransfer" ? "bg-green-200":""}    absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}>
        <TbCubeSend className="w-4 h-4" />
        </span>
        <div className={`${status == "readyForTransfer" ? "bg-green-200 shadow-md animate-bounce hover:cursor-pointer":""} p-2 px-4 w-auto inline-block rounded-md`}>
        <h3 className="font-medium leading-tight">Transfer to wrapper</h3>
        </div>
    </li>
    <li className="mb-8 ms-6 " onClick={()=>wrap(name.name, name.domainBytecode)}>
    <span className={`${status == "readyForWrap" ? "bg-green-200":""}    absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}>
        <IoIosGift className="w-4 h-4" />
        </span>
        <div className={`${status == "readyForWrap" ? "bg-green-200 shadow-md animate-bounce hover:cursor-pointer":""} p-2 px-4 w-auto inline-block rounded-md `}>
        <h3 className="font-medium leading-tight">Wrap</h3>
        </div>
    </li>
    <li className="ms-6 " onClick={()=>unwrap(name.name, name.domainBytecode)}>
    <span className={`${status == "readyForUnwrap" ? "bg-green-200":""}    absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}>
        <FaBoxOpen className="w-4 h-4" />
        </span>
        <div className={`${status == "readyForUnwrap" ? "bg-green-200 shadow-md animate-bounce hover:cursor-pointer":""} p-2 px-4 w-auto inline-block rounded-md shadow-md`}>
        <h3 className="font-medium leading-tight">Unwrap</h3>
        </div>
    </li>
</ol>
</div>

    )
}