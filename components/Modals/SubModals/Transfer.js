"use client"

import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { getCurrentSigner} from "@/utils/etherutils";
import LNR from "@/utils/lnrethers";
import { getStatus, transferByTokenId, transferByDomainBytecode, resolveOrReturn } from "@/utils/nameUtils";
import { motion} from "framer-motion";


export default function Transfer({name}){

    const { walletProvider } = useWeb3ModalProvider();

    const [loading, setLoading] = useState(true)
    const [recipient, setRecipient] = useState("")

    async function handleTransfer(addressOrName){
        setLoading(true)

        try{
            const {address, signer} = await getCurrentSigner(walletProvider)

            const toAddress = await resolveOrReturn(signer, addressOrName)
            console.log("response here ", toAddress)
            if(!toAddress){
                return toast.error("Please enter a valid address or name")
            } 

            let statusResp = await getStatus(walletProvider, name.name, name.domainBytecode)
            console.log("status is ", statusResp)
            if(statusResp == "readyForCreateWrapper" && toAddress == LNR.WRAPPER_ADDRESS){
                toast.error("Don't transfer the name until the wrapper is created")
            }
            if(statusResp == "readyForWrap"){
                toast.error("Please finalize wrapping the name first")
            }
            if(statusResp == "readyForCreateWrapper"){
                var data = await transferByDomainBytecode(signer, toAddress, name.domainBytecode)

            }
            if(statusResp == "readyForUnwrap"){
                var data = await transferByTokenId(signer, address, toAddress, name.tokenId)

            }
            if(data == "Transaction Failed"){
                toast.error(data)
            }

            if(data == "Transaction Successful"){
                toast.success(data)

            }
            else{
                toast.error("Oops, something went wrong")
            }
            return(setLoading(false))

        } catch(e){
            return(setLoading(false))
        }
        

    }


    return(


        <motion.div
        transition={{ delay: .3 }}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        key={"transfer"}
        > 
        <div className="relative ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {name.name}
                </h3>
            </div>
            <div className="p-4 md:p-5 my-4 mt-0 space-y-3">
                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white font-extralight">Transfer <span className="font-bold">{name.domainUtf8}</span></label>
                    <input onChange={(e)=>setRecipient(e.target.value)} value={recipient} type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address or name.og" required />
            </div>
            <div className="w-full px-4 h-auto flex flex-end items-center justify-end  ">
            <button onClick={()=>handleTransfer(recipient)} type="button" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Transfer</button>

            </div>

        </div>
  </motion.div>

    )
}