"use client"

import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { getCurrentSigner} from "@/utils/etherutils";
import LNR from "@/utils/lnrethers";
import { getStatus, transferByTokenId, transferByDomainBytecode, resolveOrReturn } from "@/utils/nameUtils";
import { motion} from "framer-motion";
import { IoMdSend } from "react-icons/io";


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
            <div className="p-4 md:p-5 my-4 mt-0 space-y-3 relative">
            <label className="mb-2 text-sm font-medium text-gray-900  dark:text-white">Transfer</label>
                    <input onChange={(e)=>setRecipient(e.target.value)} value={recipient} type="text"  className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address or name.og" required />
                    <div className="absolute bottom-6 rounded-md shadow-sm end-6  " role="group">
                        <button onClick={()=>handleTransfer(recipient)} type="button" className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white `}>
                            <IoMdSend className="w-4 h-4" />
                        </button>
                    </div>
            </div>
        </div>
  </motion.div>

    )
}