"use client"

import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { getCurrentSigner} from "@/utils/etherutils";
import { motion} from "framer-motion";
import { callLnrClass, handleTextRecord } from "@/utils/nameUtils";
import { FaSearch } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";


export default function Record({name, auth}){

    const { walletProvider } = useWeb3ModalProvider();

    const [loading, setLoading] = useState(true)

    const [recordKey, setRecordKey] = useState("")
    const [recordValue, setRecordValue] = useState("")


    async function handleRecord(action){
        console.log(name)
        setLoading(true)

        try{
            const {address, signer} = await getCurrentSigner(walletProvider)
            let args

            if(action == "getTextRecord"){
                args = [name.name, recordKey]

                let data = await handleTextRecord(signer, action, ...args)
                if(data){
                    setRecordValue(data)
                }else{
                    setRecordValue("No record set")
                }
            }
            else{
                if(action == "setTextRecord"){
                    args = [name.name, recordKey, recordValue]
                }

                if(action == "unsetTextRecord"){
                    args = [name.name, recordKey]
                }

                let data = await handleTextRecord(signer, action, ...args)

                if(data == "Transaction Failed"){
                    toast.error(data)
                }

                if(data == "Transaction Successful"){
                    toast.success(data)

                }
            }

            setLoading(false)

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
        key={"resolve"}
        > 
        <div className="relative ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {name.name}
                </h3>
            </div>
            <div className="p-2 md:p-5 my-2 mt-0 space-y-3">
                <div className="relative">
                <label className="mb-2 text-sm font-medium text-gray-900  dark:text-white">Record key</label>
                    <input onChange={(e)=>setRecordKey(e.target.value)} value={recordKey} type="text"  className="block mt-1 w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Record key" required />
                    <div className="inline-flex rounded-md shadow-sm absolute end-2.5 bottom-2.5" role="group">
                        <button onClick={()=>handleRecord("getTextRecord")} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <FaSearch className="w-4 h-4" />
                        </button>
                        <button disabled={auth !== "owner"} onClick={()=>handleRecord("unsetTextRecord")}  type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <FaRegTrashAlt className="w-4 h-4" />
                        </button>

                    </div>
                </div>
                <div className="relative">
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">Record value</label>
                <textarea onChange={(e)=>setRecordValue(e.target.value)} value={recordValue} rows="4" className="block mt-1 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Record value"/>
                <button disabled={auth !== "owner"} onClick={()=>handleRecord("setTextRecord")} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Set</button>
               
                </div>
            </div>


        </div>
  </motion.div>

    )
}