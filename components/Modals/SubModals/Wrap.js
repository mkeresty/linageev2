"use client"

import {useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import LNR from "@/utils/lnrethers";
import { callLnrClass, getStatus } from "@/utils/nameUtils";
import { IoIosGift } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { TbCubeSend } from "react-icons/tb";
import { motion} from "framer-motion";
import { useWeb3 } from "@/context/ethersProvider";

export default function Wrap({name}){
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)

    const {provider, signer} = useWeb3()

    const statuses = [
                        {statusName: "readyForCreateWrapper", title:"Create wrapper", action: "createWrapper", args: [name.name], icon: <LuSparkles className="w-4 h-4" />},
                        {statusName: "readyForTransfer", title:"Transfer to wrapper", action: "transferToWrapper", args:[LNR.WRAPPER_ADDRESS, name.name], icon: <TbCubeSend className="w-4 h-4" />},
                        {statusName: "readyForWrap", title:"Wrap", action: "wrap", args: [name.domainBytecode], icon: <IoIosGift className="w-4 h-4" />},
                        {statusName: "readyForUnwrap", title:"Unwrap", action: "unwrap", args: [name.name], icon: <FaBoxOpen className="w-4 h-4" />},
                     ]

    const handleStatus = async() =>{
        setLoading(true)
        let statusResp = await getStatus(signer, name.name, name.domainBytecode)
        setStatus(statusResp)
        setLoading(false)
        return
    }

    useEffect(()=>{
        if(name && name.name && signer){
            handleStatus()
        }

    },[name, signer])



    async function handleAction(action, statusName, args){
        setLoading(true)

        try{


            let statusResp = await getStatus(signer, name.name, name.domainBytecode)
            if(statusResp !== statusName){
                return(toast.error("Incorrect status, please reload or wait for any pending transactions"))
            }

            let data = await callLnrClass(signer, action, ...args)

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


    return(
        <motion.div

        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        key={"wrapping"}
        > 
        <div className="relative ">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {name.name}
            </h3>
        </div>
        <div className="p-4 md:p-5">
            <ul className="my-4 mt-0 space-y-3">
            {statuses.map((item, index) => ( 
                <li key={"li"+item.statusName}>
                    <button disabled={status !== item.statusName} key={item.statusName} onClick={()=>handleAction(item.action, item.statusName, item.args)} className={`w-full flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group dark:bg-gray-600  dark:text-white ${status == item.statusName ? "hover:cursor-pointer hover:bg-gray-100 hover:shadow dark:hover:bg-gray-500": "opacity-50"}`}>

                        <span className={`${status == item.statusName ? "bg-green-200 animate-pulse":" "} flex items-center justify-center w-8 h-8 rounded-full  `}>
                        {item.icon}
                        </span>
                        <span className="ml-2 ms-3 whitespace-nowrap">{item.title}</span>
                        </button>
                </li>
                ))}

            </ul>

        </div>
  </div>
  </motion.div>

    )
}

